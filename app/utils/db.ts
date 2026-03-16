// import type {
//     Job,
//     Project,
//     Book,
//     Certification,
//     Skills,
//     Socials,
//     Profile,
//     ExperienceSection,
//     ExperienceLink,
//     Persona,
// } from "~/types"

// export const profile: Profile = {
//     firstName: "Brendan",
//     middleName: "Michael",
//     lastName: "Lynch",
//     location: "Kitchener, ON",
//     born: "Powell River, BC",
//     yearsOfExperience: 1,
//     school: {
//         name: "University of Victoria",
//         degree: "BSc in Computer Science",
//         startDate: "2021-04-01",
//         url: "https://www.uvic.ca/",
//         endDate: "2025-06-01",
//         courses: ["Computer Networks", "Machine Learning", "Artificial Intelligence"],
//         transcript: null,
//     },
//     about: {
//         fun: "Hey, I'm Brendan — a full stack engineer based in Kitchener, ON. When I'm not pushing pixels or wrangling microservices, you'll find me hunting for vintage synthesizers. I'm convinced most of life's problems can be solved with a good breakfast taco.",
//         technical: "I build beautiful and intuitive web applications. I approach each project with intention, moving beyond the 'what', to understand the where, why, and how. I am driven by the intersection of thoughtful design and the inherent complexity of interconnected systems."
//     },
//     tag: {
//         fun: "Builder · Kitchener, ON",
//         technical: "Full Stack Engineer · Kitchener, ON",
//     },
// }

// export const socials: Socials = {
//     linkedin: "https://www.linkedin.com/in/brendanml/",
//     youtube: "https://www.youtube.com/@dabml",
//     email: "hello@brendanml.com",
//     github: "https://github.com/brendanml",
// }

// export const skills: Skills = {
//     languages: ["JavaScript", "TypeScript", "Python", "C/C++", "HTML", "CSS"],
//     frontend: ["React", "Tailwind CSS", "shadcn", "MaterialUI"],
//     backend: ["Node.js", "Express.js", "Fastify"],
//     databases: ["MongoDB", "SQL"],
//     testing: ["Playwright", "Vitest"],
//     tools: ["AWS", "Docker", "Git", "Postman"],
// }

// export const jobs: Job[] = [
//     {
//         title: "Junior Full Stack Developer",
//         company: "LabsCubed",
//         url: "https://www.labscubed.com/",
//         location: "Kitchener, ON",
//         startDate: "2025-06-01",
//         endDate: null,
//         years: "1",
//         description: "I built both frontend UIs and backend controllers/services for our linux-based materials testing robots. Some features include: Remote machine status visualization dashboards, settings panels, and machine calibration wizards. On the infrastructure side, I designed and deployed our SSO proxy layer on AWS leveraging OAuth2",
//         tags: ["JavaScript", "React", "Node.js", "MongoDB", "Express", "Python", "Flask", "AWS", "OAuth2"],
//         persona: "technical",
//     },
// ]

// export const projects: Project[] = [
//     {
//         name: "Better Letter",
//         type: "programming",
//         url: null,
//         github: "https://github.com/brendanml",
//         blog: null,
//         youtube: null,
//         startDate: "2025-05-01",
//         endDate: "2025-06-01",
//         description: "AI-powered cover letter generation platform. Digests job descriptions and user resumes to create tailored cover letters.",
//         tags: ["React", "TypeScript", "Tailwind CSS", "Express.js", "Node.js", "APIs", "MongoDB"],
//         persona: "technical",
//     },
//     {
//         name: "rebiblio",
//         type: "programming",
//         url: null,
//         github: "https://github.com/brendanml/rebiblio",
//         blog: null,
//         youtube: null,
//         startDate: "2024-09-01",
//         endDate: "2024-12-01",
//         description: "Book & boardgame online local library — borrow and lend physical items within your community.",
//         tags: ["React", "Node", "Express", "MongoDB", "Playwright", "Tailwind", "shadcn", "Redux", "react-query", "REST"],
//         persona: "technical",
//     },
//     {
//         name: "dafig",
//         type: "programming",
//         url: null,
//         github: "https://github.com/brendanml/dafig",
//         blog: null,
//         youtube: "https://youtu.be/ACdeKkc9W3Q",
//         startDate: "2023-09-01",
//         endDate: "2023-12-01",
//         description: "Lego purchasing & pricing analytics tool. Scrapes and aggregates market data to surface deals and price trends.",
//         tags: ["React", "Node", "MongoDB", "Python", "Express", "REST", "AI"],
//         persona: "technical",
//     },
//     {
//         name: "shallowmind",
//         type: "programming",
//         url: null,
//         github: "https://github.com/brendanml/shallowmind",
//         blog: null,
//         youtube: "https://www.youtube.com/watch?v=kNM1cPyCSfA",
//         startDate: "2023-01-01",
//         endDate: "2023-04-01",
//         description: "AI chess bot and co-op chess game built from scratch with a minimax engine and raylib renderer.",
//         tags: ["C", "C++", "raylib"],
//         persona: "technical",
//     },
//     {
//         name: "algovis",
//         type: "programming",
//         url: "https://brendanml.github.io/algovis/",
//         github: "https://github.com/brendanml/algovis",
//         blog: null,
//         youtube: null,
//         startDate: "2022-09-01",
//         endDate: "2022-12-01",
//         description: "Interactive pathfinding algorithm visualizer for the land-grid problem. Supports BFS, DFS, Dijkstra, and A*.",
//         tags: ["HTML5", "JavaScript", "CSS3"],
//         persona: "technical",
//     },
//     {
//         name: "worldpainter",
//         type: "programming",
//         url: null,
//         github: "https://github.com/brendanml/worldpainter",
//         blog: null,
//         youtube: null,
//         startDate: "2024-01-01",
//         endDate: "2024-04-01",
//         description: "2D tile-based world building tool with a paintbrush interface for placing terrain, objects, and biomes.",
//         tags: ["C", "C++", "raylib"],
//         persona: "technical",
//     },
//     {
//         name: "aidy_fork",
//         type: "programming",
//         url: null,
//         github: "https://github.com/brendanml/aidy_fork",
//         blog: null,
//         youtube: null,
//         startDate: "2024-05-01",
//         endDate: "2024-08-01",
//         description: "DNA sequencing machine learning pipeline. Forked and extended an existing model to improve basecalling accuracy.",
//         tags: ["Python", "TensorFlow", "Bash"],
//         persona: "technical",
//     },
// ]

// export const books: Book[] = [
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "Shoe Dog: A Memoir by the Creator of Nike",
//         shortTitle: "Shoe Dog",
//         author: "Phil Knight",
//         thoughts: "A great listen when read by Phil himself.",
//         article: "example.com",
//         progress: 100,
//         date: "2023-11-14",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1654215925i/61215351.jpg",
//         title: "The Fellowship of the Ring",
//         shortTitle: "The Fellowship of the Ring",
//         author: "J.R.R. Tolkien",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2024-06-20",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "Greenlights",
//         shortTitle: "Greenlights",
//         author: "Matthew McConaughey",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2024-06-20",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "The Lathe of Heaven",
//         shortTitle: "The Lathe of Heaven",
//         author: "Ursula K. Le Guin",
//         thoughts: "",
//         article: "",
//         progress: 0,
//         date: "2024-05-17",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "The Creative Act: A Way of Being",
//         shortTitle: "The Creative Act",
//         author: "Rick Rubin",
//         thoughts: "",
//         article: "",
//         progress: 0,
//         date: "2024-01-27",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "Mindf*ck: Cambridge Analytica and the Plot to Break America",
//         shortTitle: "Mindf*ck",
//         author: "Christopher Wylie",
//         thoughts: "",
//         article: "",
//         progress: 10,
//         date: "2023-11-19",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "The Alignment Problem: Machine Learning and Human Values",
//         shortTitle: "The Alignment Problem",
//         author: "Brian Christian",
//         thoughts: "",
//         article: "",
//         progress: 5,
//         date: "2023-08-27",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "Crafting Interpreters",
//         shortTitle: "Crafting Interpreters",
//         author: "Robert Nystrom",
//         thoughts: "",
//         article: "",
//         progress: 10,
//         date: "2023-07-13",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "Build: An Unorthodox Guide to Making Things Worth Making",
//         shortTitle: "Build",
//         author: "Tony Fadell",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2022-06-23",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "Story: Substance, Structure, Style, and the Principles of Screenwriting",
//         shortTitle: "Story",
//         author: "Robert McKee",
//         thoughts: "",
//         article: "",
//         progress: 50,
//         date: "2022-06-23",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "Crucial Conversations: Tools for Talking When Stakes are High",
//         shortTitle: "Crucial Conversations",
//         author: "Kerry Patterson",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2022-12-28",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "Atomic Habits",
//         shortTitle: "Atomic Habits",
//         author: "James Clear",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2021-08-14",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "1984",
//         shortTitle: "1984",
//         author: "George Orwell",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2022-08-23",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "Can't Hurt Me",
//         shortTitle: "Can't Hurt Me",
//         author: "David Goggins",
//         thoughts: "Great read! Really hard to put down. Highly motivating.",
//         article: "",
//         progress: 100,
//         date: "2022-06-30",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "The Shining",
//         shortTitle: "The Shining",
//         author: "Stephen King",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2022-06-28",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "Super Pumped: The Battle for Uber",
//         shortTitle: "Super Pumped",
//         author: "Mike Isaac",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2022-06-07",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "The Power of Habit: Why We Do What We Do in Life and Business",
//         shortTitle: "The Power of Habit",
//         author: "Charles Duhigg",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2022-03-17",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "Think and Grow Rich",
//         shortTitle: "Think and Grow Rich",
//         author: "Napoleon Hill",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2021-08-20",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "The Daily Stoic",
//         shortTitle: "The Daily Stoic",
//         author: "Ryan Holiday",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2021-08-14",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "The Richest Man in Babylon",
//         shortTitle: "The Richest Man in Babylon",
//         author: "George S. Clason",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2021-08-14",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "The Tipping Point: How Little Things Can Make a Big Difference",
//         shortTitle: "The Tipping Point",
//         author: "Malcolm Gladwell",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2021-08-14",
//     },
//     {
//         cover: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg",
//         title: "How to Win Friends & Influence People",
//         shortTitle: "How to Win Friends & Influence People",
//         author: "Dale Carnegie",
//         thoughts: "",
//         article: "",
//         progress: 100,
//         date: "2021-08-14",
//     }
// ]

// export const certifications: Certification[] = [
//     {
//         name: "Full Stack Open",
//         organization: "University of Helsinki",
//         date: "2025-02-01",
//         persona: "technical",
//         url: "https://fullstackopen.com/en/about",
//         skills: ["React", "Node.js", "Express.js", "MongoDB", "Redux", "React Router", "GraphQL", "React Native", "Playwright", "Vitest", "CI/CD"],
//     },
//     {
//         name: "The Web Developer Bootcamp",
//         organization: "Colt Steele",
//         date: "2021-05-01",
//         url: "https://www.udemy.com/course/the-web-developer-bootcamp/",
//         persona: "technical",
//         skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "REST APIs", "Bootstrap"],
//     },
// ]

// const forPersona = <T extends { persona?: Persona }>(items: T[], persona: Persona) =>
//     items.filter((i) => !i.persona || i.persona === persona)

// const formatMonth = (iso: string) =>
//     new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })

// const displayDate = (startDate: string, endDate: string | null) => {
//     const start = formatMonth(startDate)
//     if (!endDate) return `${start} – Present`
//     const end = formatMonth(endDate)
//     return start === end ? start : `${start} – ${end}`
// }

// export const getExperiences = (persona: Persona): ExperienceSection[] => {
//     const sections: ExperienceSection[] = [
//         {
//             id: "work-experience",
//             label: "Work",
//             heading: "Work Experience",
//             entries: forPersona(jobs, persona).map((job) => ({
//                 title: job.company,
//                 subtitle: job.title,
//                 description: job.description,
//                 date: displayDate(job.startDate, job.endDate),
//                 url: job.url,
//                 tags: job.tags,
//             })),
//         },
//         {
//             id: "education",
//             label: "Education",
//             heading: "Education",
//             entries: [
//                 {
//                     title: profile.school.name,
//                     subtitle: profile.school.degree,
//                     url: profile.school.url,
//                     date: displayDate(profile.school.startDate, profile.school.endDate),
//                     tags: profile.school.courses,
//                 },
//             ],
//         },
//         {
//             id: "projects",
//             label: "Projects",
//             heading: "Projects",
//             entries: forPersona(projects, persona)
//                 .filter((proj) => persona === "technical" ? proj.type === "programming" : true)
//                 .map((proj) => ({
//                     title: proj.name,
//                     description: proj.description,
//                     date: displayDate(proj.startDate, proj.endDate),
//                     url: proj.url ?? undefined,
//                     tags: proj.tags,
//                     links: [
//                         proj.github ? { label: "GitHub", url: proj.github } : null,
//                         proj.youtube ? { label: "YouTube", url: proj.youtube } : null,
//                         proj.blog ? { label: "Blog", url: proj.blog } : null,
//                     ].filter(Boolean) as ExperienceLink[],
//                 })),
//         },
//         {
//             id: "certifications",
//             label: "Certifications",
//             heading: "Certifications",
//             entries: forPersona(certifications, persona).map((cert) => ({
//                 title: cert.name,
//                 subtitle: cert.organization,
//                 date: cert.date ? `${new Date(cert.date).getFullYear()}` : "",
//                 url: cert.url,
//                 tags: cert.skills,
//             })),
//         },
//     ]

//     return sections.filter((s) => s.entries.length > 0)
// }

// export const getBooks = () =>
//     books.map((book) => ({
//         ...book,
//         title: book.title.length > 35 ? book.title.slice(0, 35) + "…" : book.title,
//     }))

// export const getFullName = () =>
//     `${profile.firstName} ${profile.middleName} ${profile.lastName}`
