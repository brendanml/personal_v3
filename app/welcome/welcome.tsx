import logoDark from "./logo-dark.svg"
import logoLight from "./logo-light.svg"

export function Welcome() {
  return (
    <main className="min-h-screen bg-primary text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-16 space-y-16">
        <header className="flex flex-col items-center gap-6 text-center">
          <div className="w-64">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
          <h1 className="text-4xl font-bold text-accent">Welcome</h1>
          <p className="text-foreground/70 max-w-md">
            Get started by exploring the resources below.
          </p>
        </header>

        {/* Feature cards — container query grid */}
        <section className="@container">
          <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="@container rounded-2xl bg-secondary/40 border border-secondary p-6"
              >
                <div className="flex flex-col @xs:flex-row @xs:items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Two-column layout with container queries */}
        <section className="@container">
          <div className="grid grid-cols-1 @md:grid-cols-[2fr_1fr] gap-6">
            {/* Main content area */}
            <div className="@container rounded-2xl bg-secondary/40 border border-secondary p-6 space-y-4">
              <h2 className="text-xl font-bold text-accent">Getting Started</h2>
              <div className="grid grid-cols-1 @sm:grid-cols-2 gap-3">
                {steps.map((step, i) => (
                  <div
                    key={step.title}
                    className="flex gap-3 rounded-lg bg-primary/60 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-primary text-sm font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-foreground/60 mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar — resources */}
            <nav className="@container rounded-2xl bg-secondary/40 border border-secondary p-6 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                Resources
              </p>
              <ul className="space-y-1">
                {resources.map(({ href, text, icon }) => (
                  <li key={href}>
                    <a
                      className="group flex items-center gap-3 rounded-lg p-3 leading-normal text-foreground transition-colors hover:bg-accent/10 hover:text-accent-secondary"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {icon}
                      <span className="@xs:inline">{text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* Stats bar — container query responsive */}
        <section className="@container rounded-2xl bg-secondary/40 border border-secondary p-6">
          <div className="grid grid-cols-2 @sm:grid-cols-4 gap-4 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl @sm:text-3xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="text-sm text-foreground/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

const features = [
  {
    title: "File-based Routing",
    description: "Routes map directly to files in your project structure.",
    icon: <span className="text-lg">&#128193;</span>,
  },
  {
    title: "Nested Layouts",
    description: "Share UI between routes with nested layout components.",
    icon: <span className="text-lg">&#128196;</span>,
  },
  {
    title: "Data Loading",
    description: "Load data before rendering with loaders and actions.",
    icon: <span className="text-lg">&#9889;</span>,
  },
  {
    title: "Type Safety",
    description: "End-to-end type safety from loaders to components.",
    icon: <span className="text-lg">&#128274;</span>,
  },
  {
    title: "SSR & SSG",
    description: "Server-side rendering and static generation built in.",
    icon: <span className="text-lg">&#127760;</span>,
  },
  {
    title: "Container Queries",
    description: "Responsive design based on component size, not viewport.",
    icon: <span className="text-lg">&#128220;</span>,
  },
]

const steps = [
  {
    title: "Edit your routes",
    description: "Open app/routes and start adding pages.",
  },
  {
    title: "Add loaders",
    description: "Fetch data with type-safe loader functions.",
  },
  {
    title: "Style with Tailwind",
    description: "Use utility classes and your custom color tokens.",
  },
  {
    title: "Deploy",
    description: "Ship to any platform with a single command.",
  },
]

const resources = [
  {
    href: "https://reactrouter.com/docs",
    text: "React Router Docs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-accent group-hover:stroke-accent-secondary transition-colors"
      >
        <path
          d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        className="stroke-accent group-hover:stroke-accent-secondary transition-colors"
      >
        <path
          d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    href: "https://github.com/remix-run/react-router",
    text: "GitHub Repo",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="stroke-accent group-hover:stroke-accent-secondary transition-colors"
      >
        <path
          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

const stats = [
  { value: "7.x", label: "Latest Version" },
  { value: "50k+", label: "GitHub Stars" },
  { value: "1M+", label: "Weekly Downloads" },
  { value: "100+", label: "Contributors" },
]
