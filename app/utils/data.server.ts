import mongoose, { Schema, model, type Model } from "mongoose"
import { connectDB } from "~/lib/db.server"
import type { Profile, Socials, ExperienceSection, Book } from "~/types"

function getModel<T>(name: string, schema: Schema): Model<T> {
    return (mongoose.models[name] as Model<T>) ?? model<T>(name, schema)
}

const JobModel = getModel("Job", new Schema({
    title: String, company: String, url: String, location: String,
    startDate: String, endDate: String, years: String,
    description: String, tags: [String], persona: String,
}))

const ProjectModel = getModel("Project", new Schema({
    name: String, type: String, url: String, github: String,
    blog: String, youtube: String, startDate: String, endDate: String,
    description: String, tags: [String], importance: String,
}))

const BookModel = getModel("Book", new Schema({
    title: String, shortTitle: String, author: String, cover: String,
    thoughts: String, progress: Number, date: String, article: String,
}))

const CertificationModel = getModel("Certification", new Schema({
    name: String, organization: String, date: String, url: String,
    type: String, importance: String, skills: [String],
}))

const ArticleModel = getModel("Article", new Schema({
    title: String, slug: String, content: String, date: String,
    tags: [String], thumbnail: String, published: Boolean,
}))

const ProfileModel = getModel("Profile", new Schema({
    firstName: String, middleName: String, lastName: String,
    location: String, born: String, yearsOfExperience: Number,
    school: {
        name: String, degree: String, startDate: String,
        endDate: String, url: String, courses: [String], transcript: String,
    },
    about: { fun: String, technical: String },
    tag: { fun: String, technical: String },
    socials: { linkedin: String, youtube: String, email: String, github: String },
    skills: {
        languages: [String], frontend: [String], backend: [String],
        databases: [String], testing: [String], tools: [String],
    },
}))

const formatMonth = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })

const displayDate = (startDate: string, endDate: string | null) => {
    const start = formatMonth(startDate)
    if (!endDate) return `${start} – Present`
    const end = formatMonth(endDate)
    return start === end ? start : `${start} – ${end}`
}

export async function getBooks(): Promise<Book[]> {
    await connectDB()
    return BookModel.find({}).sort({ date: -1, title: 1 }).lean() as unknown as Book[]
}

export async function getJobs() {
    await connectDB()
    return JobModel.find({}).lean()
}

export async function getProjects() {
    await connectDB()
    return ProjectModel.find({ importance: { $in: ["high", "medium"] } }).sort({ startDate: -1 }).lean()
}

export async function getCertifications() {
    await connectDB()
    return CertificationModel.find({}).lean()
}

export async function getProfile(): Promise<Profile & { socials: Socials } | null> {
    await connectDB()
    return ProfileModel.findOne({}).lean() as unknown as Profile & { socials: Socials } | null
}

type SectionKey = "work" | "education" | "projects" | "certifications"

const sectionBuilders: Record<SectionKey, () => Promise<object>> = {
    work: async () => {
        const jobs = await getJobs()
        return {
            id: "work-experience",
            label: "Work",
            heading: "Work Experience",
            entries: jobs.map((job) => ({
                title: job.company,
                subtitle: job.title,
                description: job.description,
                date: displayDate(job.startDate!, job.endDate ?? null),
                url: job.url,
                tags: job.tags,
            })),
        }
    },

    education: async () => {
        const profile = await getProfile()
        return {
            id: "education",
            label: "Education",
            heading: "Education",
            entries: profile ? [{
                title: profile.school?.name,
                subtitle: profile.school?.degree,
                url: profile.school?.url,
                date: displayDate(profile.school!.startDate!, profile.school?.endDate ?? null),
                tags: profile.school?.courses,
            }] : [],
        }
    },

    projects: async () => {
        const projects = await getProjects()
        return {
            id: "projects",
            label: "Projects",
            heading: "Projects",
            entries: projects.map((proj) => ({
                title: proj.name,
                description: proj.description,
                date: displayDate(proj.startDate!, proj.endDate ?? null),
                url: proj.url ?? undefined,
                tags: proj.tags,
                type: proj.type,
                importance: proj.importance,
                links: [
                    proj.github ? { label: "GitHub", url: proj.github } : null,
                    proj.youtube ? { label: "YouTube", url: proj.youtube } : null,
                    proj.blog ? { label: "Blog", url: proj.blog } : null,
                ].filter(Boolean),
            })),
        }
    },

    certifications: async () => {
        const certifications = await getCertifications()
        return {
            id: "certifications",
            label: "Certifications",
            heading: "Certifications",
            entries: certifications.map((cert) => ({
                title: cert.name,
                subtitle: cert.organization,
                date: cert.date ? `${new Date(cert.date).getFullYear()}` : "",
                url: cert.url,
                tags: cert.skills,
                type: cert.type,
                importance: cert.importance,
            })),
        }
    },
}

export async function getExperiences(sections: SectionKey[] = ["work", "education", "projects", "certifications"]): Promise<ExperienceSection[]> {
    const results = await Promise.all(sections.map((key) => sectionBuilders[key]()))
    return results.filter(Boolean) as ExperienceSection[]
}

export type ArticleMeta = {
    _id: string
    slug: string
    title: string
    date: string
    tags: string[]
    readTime: string
    thumbnail?: string
    published: boolean
}

function parseReadTime(content: string): string {
    const lines = content.split("\n").filter((l) => l.trim().length > 0).length
    const minutes = Math.max(1, Math.round(lines / 40))
    return `${minutes} min read`
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
    await connectDB()
    const articles = await ArticleModel.find({ published: true }).sort({ date: -1 }).lean()
    return articles.map((a) => ({
        _id: String(a._id),
        slug: a.slug as string,
        title: a.title as string,
        date: a.date as string,
        tags: (a.tags ?? []) as string[],
        readTime: parseReadTime((a.content ?? "") as string),
        thumbnail: a.thumbnail as string | undefined,
        published: a.published as boolean,
    }))
}

export async function getArticle(slug: string): Promise<(ArticleMeta & { html: string }) | null> {
    await connectDB()
    const { marked } = await import("marked")
    const a = await ArticleModel.findOne({ slug, published: true }).lean()
    if (!a) return null
    const content = (a.content ?? "") as string
    return {
        _id: String(a._id),
        slug: a.slug as string,
        title: a.title as string,
        date: a.date as string,
        tags: (a.tags ?? []) as string[],
        readTime: parseReadTime(content),
        thumbnail: a.thumbnail as string | undefined,
        published: a.published as boolean,
        html: marked(content) as string,
    }
}
