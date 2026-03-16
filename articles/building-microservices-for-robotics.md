---
title: "Building Microservices for Robotics"
date: "2026-03-08"
tags: ["Technical", "Robotics"]
thumbnail: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fideausher.com%2Fwp-content%2Fuploads%2F2022%2F07%2FWhat-is-microservice-arxhitecture-2.webp&f=1&nofb=1&ipt=4649ad40bc1476e5994e95299a739b90429cb249153f989617643723e22458f9"
---

# Building Microservices for Robotics

When I joined LabsCubed, I inherited a monolithic control system for materials testing robots. Everything — machine state, calibration logic, sensor polling, and the HTTP API — lived in a single Node.js process. It worked, until it didn't.

## The Problem with Monoliths in Hardware Contexts

Software running alongside hardware has a different failure profile than a typical web service. A crashed HTTP handler shouldn't bring down the sensor loop. A stalled calibration wizard shouldn't block status updates from reaching the dashboard.

The first thing I did was map every concern in the existing codebase to a question: _does a failure here affect anything else?_ Almost everything did.

## Designing the Boundaries

I settled on three services:

- **State service** — owns the machine's canonical state, emits events on change
- **Calibration service** — long-running wizard logic, isolated from everything else
- **API gateway** — thin HTTP layer, subscribes to state, forwards commands

The key insight was that the state service should be the only thing that writes to the machine. Every other service sends intent; the state service decides what to do with it.

## Communication

We used a lightweight message bus over Unix sockets for inter-process communication on the same machine. For the dashboard — running in a browser — we exposed a WebSocket feed from the API gateway that re-broadcast state events.

This meant the dashboard was never polling. It received a snapshot on connect, then applied deltas as they arrived. Latency dropped noticeably.

## What I'd Do Differently

Start with the message contracts. I wrote the services first and the message schemas second, which led to a painful refactor when two services had slightly different assumptions about the shape of a `MachineStatus` event.

Define the messages, then build around them.

## Takeaways

Microservices aren't always the right answer — but in a context where hardware reliability matters and failure isolation is a first-class concern, the separation paid off. The calibration service has crashed twice in production. Neither time did the operator lose their live machine view.
