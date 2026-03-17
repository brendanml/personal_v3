const Job = require("../models/Job")
const Project = require("../models/Project")
const Book = require("../models/Book")
const Certification = require("../models/Certification")
const Profile = require("../models/Profile")

async function getBooks() {
    const books = await Book.find({}).lean()
    return books
}

async function getJobs() {
    return Job.find({}).lean()
}

async function getProjects() {
    return Project.find({}).lean()
}

async function getCertifications() {
    return Certification.find({}).lean()
}

async function getProfile() {
    return Profile.findOne({}).lean()
}

async function getFullName() {
    const profile = await Profile.findOne(
        {},
        { firstName: 1, middleName: 1, lastName: 1 },
    ).lean()
    return `${profile.firstName} ${profile.middleName} ${profile.lastName}`
}

const formatMonth = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    })

const displayDate = (startDate, endDate) => {
    const start = formatMonth(startDate)
    if (!endDate) return `${start} – Present`
    const end = formatMonth(endDate)
    return start === end ? start : `${start} – ${end}`
}

const sectionBuilders = {
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
                date: displayDate(job.startDate, job.endDate),
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
            entries: [
                {
                    title: profile.school.name,
                    subtitle: profile.school.degree,
                    url: profile.school.url,
                    date: displayDate(
                        profile.school.startDate,
                        profile.school.endDate,
                    ),
                    tags: profile.school.courses,
                },
            ],
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
                date: displayDate(proj.startDate, proj.endDate),
                url: proj.url ?? undefined,
                tags: proj.tags,
                type: proj.type,
                importance: proj.importance,
                links: [
                    proj.github ? { label: "GitHub", url: proj.github } : null,
                    proj.youtube
                        ? { label: "YouTube", url: proj.youtube }
                        : null,
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

/**
 * @param {Array<"work"|"education"|"projects"|"certifications">} [sections]
 */
async function getExperiences(sections = Object.keys(sectionBuilders)) {
    const results = await Promise.all(
        sections.map((key) => sectionBuilders[key]?.()),
    )
    return results.filter((s) => s && s.entries.length > 0)
}

module.exports = {
    getBooks,
    getJobs,
    getProjects,
    getCertifications,
    getProfile,
    getFullName,
    getExperiences,
}
