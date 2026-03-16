require("dotenv").config()
const mongoose = require("mongoose")

const Job = require("./models/Job")
const Project = require("./models/Project")
const Book = require("./models/Book")
const Certification = require("./models/Certification")
const Profile = require("./models/Profile")
const Article = require("./models/Article")

const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/personal"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const profile = {
    firstName: "Brendan",
    middleName: "Michael",
    lastName: "Lynch",
    location: "Kitchener, ON",
    born: "Powell River, BC",
    yearsOfExperience: 1,
    school: {
        name: "University of Victoria",
        degree: "BSc in Computer Science",
        startDate: "2021-04-01",
        endDate: "2025-06-01",
        url: "https://www.uvic.ca/",
        courses: [
            "Computer Networks",
            "Machine Learning",
            "Artificial Intelligence",
        ],
        transcript: null,
    },
    about: {
        fun: "Hey, I'm Brendan — a full stack engineer based in Kitchener, ON. When I'm not pushing pixels or wrangling microservices, you'll find me hunting for vintage synthesizers. I'm convinced most of life's problems can be solved with a good breakfast taco.",
        technical:
            "I build beautiful and intuitive web applications. I approach each project with intention, moving beyond the 'what', to understand the where, why, and how. I am driven by the intersection of thoughtful design and the inherent complexity of interconnected systems.",
    },
    tag: {
        fun: "Builder · Kitchener, ON",
        technical: "Full Stack Engineer · Kitchener, ON",
    },
    socials: {
        linkedin: "https://www.linkedin.com/in/brendanml/",
        youtube: "https://www.youtube.com/@dabml",
        email: "hello@brendanml.com",
        github: "https://github.com/brendanml",
    },
    skills: {
        languages: [
            "JavaScript",
            "TypeScript",
            "Python",
            "C/C++",
            "HTML",
            "CSS",
        ],
        frontend: ["React", "Tailwind CSS", "shadcn", "MaterialUI"],
        backend: ["Node.js", "Express.js", "Fastify"],
        databases: ["MongoDB", "SQL"],
        testing: ["Playwright", "Vitest"],
        tools: ["AWS", "Docker", "Git", "Postman"],
    },
}

const jobs = [
    {
        title: "Junior Full Stack Developer",
        company: "LabsCubed",
        url: "https://www.labscubed.com/",
        location: "Kitchener, ON",
        startDate: "2025-06-01",
        endDate: null,
        years: "1",
        description:
            "I built both frontend UIs and backend controllers/services for our linux-based materials testing robots. Some features include: Remote machine status visualization dashboards, settings panels, and machine calibration wizards. On the infrastructure side, I designed and deployed our SSO proxy layer on AWS leveraging OAuth2",
        tags: [
            "JavaScript",
            "React",
            "Node.js",
            "MongoDB",
            "Express",
            "Python",
            "Flask",
            "AWS",
            "OAuth2",
        ],
        persona: "technical",
    },
]

const projects = [
    {
        name: "Better Letter",
        type: "dev",
        importance: "high",
        url: null,
        github: "https://github.com/brendanml",
        blog: null,
        youtube: null,
        startDate: "2025-05-01",
        endDate: "2025-06-01",
        description:
            "AI-powered cover letter generation platform. Digests job descriptions and user resumes to create tailored cover letters.",
        tags: [
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Express.js",
            "Node.js",
            "APIs",
            "MongoDB",
        ],
    },
    {
        name: "rebiblio",
        type: "dev",
        importance: "high",
        url: null,
        github: "https://github.com/brendanml/rebiblio",
        blog: null,
        youtube: null,
        startDate: "2024-09-01",
        endDate: "2024-12-01",
        description:
            "Book & boardgame online local library — borrow and lend physical items within your community.",
        tags: [
            "React",
            "Node",
            "Express",
            "MongoDB",
            "Playwright",
            "Tailwind",
            "shadcn",
            "Redux",
            "react-query",
            "REST",
        ],
    },
    {
        name: "dafig",
        type: "dev",
        importance: "high",
        url: null,
        github: "https://github.com/brendanml/dafig",
        blog: null,
        youtube: "https://youtu.be/ACdeKkc9W3Q",
        startDate: "2023-09-01",
        endDate: "2023-12-01",
        description:
            "Lego purchasing & pricing analytics tool. Scrapes and aggregates market data to surface deals and price trends.",
        tags: ["React", "Node", "MongoDB", "Python", "Express", "REST", "AI"],
    },
    {
        name: "shallowmind",
        type: "dev",
        importance: "high",
        url: null,
        github: "https://github.com/brendanml/shallowmind",
        blog: null,
        youtube: "https://www.youtube.com/watch?v=kNM1cPyCSfA",
        startDate: "2023-01-01",
        endDate: "2023-04-01",
        description:
            "AI chess bot and co-op chess game built from scratch with a minimax engine and raylib renderer.",
        tags: ["C", "C++", "raylib"],
    },
    {
        name: "algovis",
        type: "dev",
        importance: "high",
        url: "https://brendanml.github.io/algovis/",
        github: "https://github.com/brendanml/algovis",
        blog: null,
        youtube: null,
        startDate: "2022-09-01",
        endDate: "2022-12-01",
        description:
            "Interactive pathfinding algorithm visualizer for the land-grid problem. Supports BFS, DFS, Dijkstra, and A*.",
        tags: ["HTML5", "JavaScript", "CSS3"],
    },
    {
        name: "worldpainter",
        type: "dev",
        importance: "high",
        url: null,
        github: "https://github.com/brendanml/worldpainter",
        blog: null,
        youtube: null,
        startDate: "2024-01-01",
        endDate: "2024-04-01",
        description:
            "2D tile-based world building tool with a paintbrush interface for placing terrain, objects, and biomes.",
        tags: ["C", "C++", "raylib"],
    },
    {
        name: "aidy_fork",
        type: "dev",
        importance: "high",
        url: null,
        github: "https://github.com/brendanml/aidy_fork",
        blog: null,
        youtube: null,
        startDate: "2024-05-01",
        endDate: "2024-08-01",
        description:
            "DNA sequencing machine learning pipeline. Forked and extended an existing model to improve basecalling accuracy.",
        tags: ["Python", "TensorFlow", "Bash"],
    },
]

const books = [
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "Shoe Dog: A Memoir by the Creator of Nike",
        shortTitle: "Shoe Dog",
        author: "Phil Knight",
        thoughts: "A great listen when read by Phil himself.",
        article: "example.com",
        progress: 100,
        date: "2023-11-14",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1654215925i/61215351.jpg",
        title: "The Fellowship of the Ring",
        shortTitle: "The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
        thoughts: "",
        article: "",
        progress: 100,
        date: "2024-06-20",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "Greenlights",
        shortTitle: "Greenlights",
        author: "Matthew McConaughey",
        thoughts: "Strange, honest, and hard to put down.",
        article: "/articles/greenlights-review",
        progress: 100,
        date: "2024-06-20",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "The Lathe of Heaven",
        shortTitle: "The Lathe of Heaven",
        author: "Ursula K. Le Guin",
        thoughts: "",
        article: "",
        progress: 0,
        date: "2024-05-17",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "The Creative Act: A Way of Being",
        shortTitle: "The Creative Act",
        author: "Rick Rubin",
        thoughts: "",
        article: "",
        progress: 0,
        date: "2024-01-27",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "Mindf*ck: Cambridge Analytica and the Plot to Break America",
        shortTitle: "Mindf*ck",
        author: "Christopher Wylie",
        thoughts: "",
        article: "",
        progress: 10,
        date: "2023-11-19",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "The Alignment Problem: Machine Learning and Human Values",
        shortTitle: "The Alignment Problem",
        author: "Brian Christian",
        thoughts: "",
        article: "",
        progress: 5,
        date: "2023-08-27",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "Crafting Interpreters",
        shortTitle: "Crafting Interpreters",
        author: "Robert Nystrom",
        thoughts: "",
        article: "",
        progress: 10,
        date: "2023-07-13",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "Build: An Unorthodox Guide to Making Things Worth Making",
        shortTitle: "Build",
        author: "Tony Fadell",
        thoughts: "",
        article: "",
        progress: 100,
        date: "2022-06-23",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "Story: Substance, Structure, Style, and the Principles of Screenwriting",
        shortTitle: "Story",
        author: "Robert McKee",
        thoughts: "",
        article: "",
        progress: 50,
        date: "2022-06-23",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "Crucial Conversations: Tools for Talking When Stakes are High",
        shortTitle: "Crucial Conversations",
        author: "Kerry Patterson",
        thoughts: "",
        article: "",
        progress: 100,
        date: "2022-12-28",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "Atomic Habits",
        shortTitle: "Atomic Habits",
        author: "James Clear",
        thoughts: "",
        article: "",
        progress: 100,
        date: "2021-08-14",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "1984",
        shortTitle: "1984",
        author: "George Orwell",
        thoughts: "",
        article: "",
        progress: 100,
        date: "2022-08-23",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "Can't Hurt Me",
        shortTitle: "Can't Hurt Me",
        author: "David Goggins",
        thoughts: "Great read! Really hard to put down. Highly motivating.",
        article: "",
        progress: 100,
        date: "2022-06-30",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "The Shining",
        shortTitle: "The Shining",
        author: "Stephen King",
        thoughts: "",
        article: "",
        progress: 100,
        date: "2022-06-28",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "Super Pumped: The Battle for Uber",
        shortTitle: "Super Pumped",
        author: "Mike Isaac",
        thoughts: "",
        article: "",
        progress: 100,
        date: "2022-06-07",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "The Power of Habit: Why We Do What We Do in Life and Business",
        shortTitle: "The Power of Habit",
        author: "Charles Duhigg",
        thoughts: "",
        article: "",
        progress: 100,
        date: "2022-03-17",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "Think and Grow Rich",
        shortTitle: "Think and Grow Rich",
        author: "Napoleon Hill",
        thoughts: "",
        article: "",
        progress: 100,
        date: "2021-08-20",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "The Daily Stoic",
        shortTitle: "The Daily Stoic",
        author: "Ryan Holiday",
        thoughts: "",
        article: "",
        progress: 100,
        date: "2021-08-14",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "The Richest Man in Babylon",
        shortTitle: "The Richest Man in Babylon",
        author: "George S. Clason",
        thoughts: "",
        article: "",
        progress: 100,
        date: "2021-08-14",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "The Tipping Point: How Little Things Can Make a Big Difference",
        shortTitle: "The Tipping Point",
        author: "Malcolm Gladwell",
        thoughts: "",
        article: "",
        progress: 100,
        date: "2021-08-14",
    },
    {
        cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
        title: "How to Win Friends & Influence People",
        shortTitle: "How to Win Friends & Influence People",
        author: "Dale Carnegie",
        thoughts: "",
        article: "",
        progress: 100,
        date: "2021-08-14",
    },
]

const articles = [
    {
        title: "Greenlights: A Review",
        slug: "greenlights-review",
        date: "2024-06-20",
        tags: ["Books"],
        thumbnail: null,
        published: true,
        content: `# Greenlights: A Review

Matthew McConaughey's memoir is not what I expected. I came in bracing for a celebrity retrospective — a curated highlight reel dressed up as wisdom. What I got instead was something stranger, more honest, and genuinely hard to put down.

## What It Is

_Greenlights_ is structured around McConaughey's journals, which he's kept since he was a teenager. The book reads less like a linear autobiography and more like a series of dispatches from a life lived at full volume — chapters that swing between dust-covered road trips across Africa, film sets, family loss, and extended philosophical riffs on what it means to say yes to your life.

The central metaphor is traffic lights. Red lights stop you. Yellow lights slow you. Green lights let you go. His argument — and it's more earned than it sounds — is that the red lights in life often turn green in retrospect. The things that seemed like failures were frequently redirections.

## What Works

The voice is the thing. McConaughey writes the way he talks, which either works for you or it doesn't. For me, it worked. The rhythm is loose and confident without tipping into self-congratulation. He's clearly enjoying himself, and that energy is contagious.

The stories involving his father are the best in the book. Raw without being manipulative, specific enough to feel real. The section covering his time in a Moroccan jail — a long weekend of uncertainty that he somehow turns into a meditation on solitude — is a highlight.

He's also funnier than the premise suggests.

## What Doesn't

The philosophical observations can tip into vague motivational territory. "Just keep living" is his personal motto and the book returns to it often. Sometimes it lands. Sometimes it's a bumper sticker.

The structure is deliberately non-linear and journal-like, which suits the content but occasionally makes the book feel like it's circling without landing. A few chapters feel included more out of personal attachment than narrative necessity.

## Verdict

Worth reading. Not because it will teach you how to live — books that promise that rarely do — but because spending time inside a genuinely unusual mind is its own reward. McConaughey has thought about his life in a way that most people haven't thought about theirs, and that comes through on every page.

**7.5 / 10**`,
    },
    {
        title: "Building Microservices for Robotics",
        slug: "building-microservices-for-robotics",
        date: "2026-03-08",
        tags: ["Technical", "Robotics"],
        thumbnail: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fideausher.com%2Fwp-content%2Fuploads%2F2022%2F07%2FWhat-is-microservice-arxhitecture-2.webp&f=1&nofb=1&ipt=4649ad40bc1476e5994e95299a739b90429cb249153f989617643723e22458f9",
        published: true,
        content: `# Building Microservices for Robotics

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

Start with the message contracts. I wrote the services first and the message schemas second, which led to a painful refactor when two services had slightly different assumptions about the shape of a \`MachineStatus\` event.

Define the messages, then build around them.

## Takeaways

Microservices aren't always the right answer — but in a context where hardware reliability matters and failure isolation is a first-class concern, the separation paid off. The calibration service has crashed twice in production. Neither time did the operator lose their live machine view.`,
    },
]

const certifications = [
    {
        name: "Full Stack Open",
        organization: "University of Helsinki",
        date: "2025-02-01",
        url: "https://fullstackopen.com/en/about",
        type: "dev",
        importance: "high",
        skills: [
            "React",
            "Node.js",
            "Express.js",
            "MongoDB",
            "Redux",
            "React Router",
            "GraphQL",
            "React Native",
            "Playwright",
            "Vitest",
            "CI/CD",
        ],
    },
    {
        name: "The Web Developer Bootcamp",
        organization: "Colt Steele",
        date: "2021-05-01",
        url: "https://www.udemy.com/course/the-web-developer-bootcamp/",
        type: "dev",
        importance: "high",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "Node.js",
            "Express.js",
            "MongoDB",
            "REST APIs",
            "Bootstrap",
        ],
    },
]

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

async function seed() {
    await mongoose.connect(MONGODB_URI)
    console.log(`Connected to ${MONGODB_URI}`)

    await Promise.all([
        Job.deleteMany({}),
        Project.deleteMany({}),
        Book.deleteMany({}),
        Certification.deleteMany({}),
        Profile.deleteMany({}),
        Article.deleteMany({}),
    ])
    console.log("Cleared existing documents")

    await Promise.all([
        Job.insertMany(jobs),
        Project.insertMany(projects),
        Book.insertMany(books),
        Certification.insertMany(certifications),
        Profile.create(profile),
        Article.insertMany(articles),
    ])
    console.log("Seeded: jobs, projects, books, certifications, profile, articles")

    await mongoose.disconnect()
    console.log("Done")
}

seed().catch((err) => {
    console.error(err)
    process.exit(1)
})
