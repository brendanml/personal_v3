export type Persona = "fun" | "technical"

export type Job = {
    title: string
    company: string
    url: string
    location: string
    startDate: string
    endDate: string | null
    years: string
    description?: string
    tags?: string[]
    persona?: Persona
}

export type ProjectType = "programming"

export type Project = {
    name: string
    type: ProjectType
    url: string | null
    github: string | null
    blog: string | null
    youtube: string | null
    startDate: string
    endDate: string | null
    description?: string
    tags?: string[]
    persona?: Persona
}

export type Book = {
    title: string
    shortTitle: string
    author: string
    cover: string | null
    thoughts?: string
    progress: number
    date?: string
    article?: string
    persona?: Persona
}

export type Certification = {
    name: string
    organization: string
    date?: string
    url?: string
    persona?: Persona
    skills?: string[]
}

export type Skills = {
    languages: string[]
    frontend: string[]
    backend: string[]
    databases: string[]
    testing: string[]
    tools: string[]
}

export type Socials = {
    linkedin: string
    youtube: string
    email: string
    github: string
}

export type Profile = {
    firstName: string
    middleName: string
    lastName: string
    location: string
    born: string
    yearsOfExperience: number
    school: {
        name: string
        degree: string
        startDate: string
        endDate: string,
        url: string,
        courses: string[],
        transcript: string | null
    }
    about: { fun: string; technical: string }
    tag: { fun: string; technical: string }
}

export type ExperienceLink = {
    label: string
    url: string
}

export type ExperienceEntry = {
    title: string
    subtitle?: string
    description?: string
    date: string
    tags?: string[]
    url?: string
    links?: ExperienceLink[]
}

export type ExperienceSection = {
    id: string
    label: string
    heading: string
    entries: ExperienceEntry[]
}
