require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")
const {
    getBooks,
    getJobs,
    getProjects,
    getCertifications,
    getProfile,
    getFullName,
    getExperiences,
} = require("./services/data")
const Article = require("./models/Article")
const ArticleType = require("./models/ArticleType")
const Book = require("./models/Book")
const Job = require("./models/Job")
const Project = require("./models/Project")
const Profile = require("./models/Profile")

const app = express()
const PORT = process.env.PORT || 6800
const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/personal"

app.use(express.json())

app.use((req, res, next) => {
    const origin = req.headers.origin
    if (origin && origin.startsWith("http://localhost")) {
        res.setHeader("Access-Control-Allow-Origin", origin)
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET,POST,PUT,DELETE,OPTIONS",
        )
        res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    }
    if (req.method === "OPTIONS") return res.sendStatus(204)
    next()
})

app.get("/books", async (req, res) => {
    const books = await getBooks()
    res.json(books)
})

app.get("/books/search", async (req, res) => {
    const q = req.query.q?.trim()
    if (!q) return res.json([])
    try {
        const key = process.env.GOOGLE_BOOKS_API_KEY
            ? `&key=${process.env.GOOGLE_BOOKS_API_KEY}`
            : ""
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=10&printType=books${key}`
        const response = await fetch(url)
        const data = await response.json()
        const results = (data.items ?? []).map((item) => {
            const info = item.volumeInfo
            const cover =
                info.imageLinks?.thumbnail?.replace("http://", "https://") ??
                null
            return {
                olKey: item.id,
                title: info.title,
                author: info.authors?.[0] ?? "Unknown",
                cover,
                year: info.publishedDate ? parseInt(info.publishedDate) : null,
            }
        })
        res.json(results)
    } catch (err) {
        res.status(502).json({ error: "Google Books unavailable" })
    }
})

app.post("/books", async (req, res) => {
    try {
        const book = await Book.create(req.body)
        res.status(201).json(book)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.delete("/books/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        if (!book) return res.status(404).json({ error: "Not found" })
        res.status(204).end()
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.get("/jobs", async (req, res) => {
    const jobs = await Job.find({}).sort({ startDate: -1 }).lean()
    res.json(jobs)
})

app.get("/jobs/:id", async (req, res) => {
    const job = await Job.findById(req.params.id).lean()
    if (!job) return res.status(404).json({ error: "Not found" })
    res.json(job)
})

app.post("/jobs", async (req, res) => {
    try {
        const job = await Job.create(req.body)
        res.status(201).json(job)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.put("/jobs/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
            runValidators: true,
        })
        if (!job) return res.status(404).json({ error: "Not found" })
        res.json(job)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.delete("/jobs/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id)
        if (!job) return res.status(404).json({ error: "Not found" })
        res.status(204).end()
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.get("/projects", async (req, res) => {
    const projects = await Project.find({}).lean()
    res.json(projects)
})

app.get("/projects/:id", async (req, res) => {
    const project = await Project.findById(req.params.id).lean()
    if (!project) return res.status(404).json({ error: "Not found" })
    res.json(project)
})

app.post("/projects", async (req, res) => {
    try {
        const project = await Project.create(req.body)
        res.status(201).json(project)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.put("/projects/:id", async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
            runValidators: true,
        })
        if (!project) return res.status(404).json({ error: "Not found" })
        res.json(project)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.delete("/projects/:id", async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id)
        if (!project) return res.status(404).json({ error: "Not found" })
        res.status(204).end()
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.get("/certifications", async (req, res) => {
    const certifications = await getCertifications()
    res.json(certifications)
})

app.get("/profile", async (req, res) => {
    const profile = await getProfile()
    res.json(profile)
})

app.put("/profile", async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate({}, req.body, {
            returnDocument: "after",
            runValidators: true,
            upsert: true,
        })
        res.json(profile)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.get("/name", async (req, res) => {
    const name = await getFullName()
    res.json({ name })
})

// ?sections=work,projects,certifications
app.get("/experiences", async (req, res) => {
    const sections = req.query.sections
        ? req.query.sections.split(",").map((s) => s.trim())
        : undefined
    const experiences = await getExperiences(sections)
    res.json(experiences)
})

app.put("/books/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
            runValidators: true,
        })
        if (!book) return res.status(404).json({ error: "Not found" })
        res.json(book)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.get("/article-types", async (req, res) => {
    const types = await ArticleType.find({}).sort({ name: 1 }).lean()
    res.json(types)
})

app.post("/article-types/clean", async (req, res) => {
    try {
        const types = await ArticleType.find({}, { name: 1 }).lean()
        const validNames = new Set(types.map((t) => t.name))
        const articles = await Article.find(
            { tags: { $exists: true, $not: { $size: 0 } } },
            { tags: 1 },
        ).lean()
        let cleaned = 0
        for (const article of articles) {
            const filtered = article.tags.filter((tag) => validNames.has(tag))
            if (filtered.length !== article.tags.length) {
                await Article.findByIdAndUpdate(article._id, { tags: filtered })
                cleaned++
            }
        }
        res.json({ cleaned })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.post("/article-types", async (req, res) => {
    try {
        const type = await ArticleType.create({ name: req.body.name })
        res.status(201).json(type)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.delete("/article-types/:id", async (req, res) => {
    try {
        const type = await ArticleType.findByIdAndDelete(req.params.id)
        if (!type) return res.status(404).json({ error: "Not found" })
        await Article.updateMany(
            { tags: type.name },
            { $pull: { tags: type.name } },
        )
        res.status(204).end()
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.get("/articles", async (req, res) => {
    const articles = await Article.find({}).sort({ date: -1 }).lean()
    res.json(articles)
})

app.get("/articles/:id", async (req, res) => {
    const article = await Article.findById(req.params.id).lean()
    if (!article) return res.status(404).json({ error: "Not found" })
    res.json(article)
})

app.post("/articles", async (req, res) => {
    try {
        const article = await Article.create(req.body)
        res.status(201).json(article)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.put("/articles/:id", async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true,
            },
        )
        if (!article) return res.status(404).json({ error: "Not found" })
        res.json(article)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.delete("/articles/:id", async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id)
        if (!article) return res.status(404).json({ error: "Not found" })
        res.status(204).end()
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log(`Connected to MongoDB`)
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err)
        process.exit(1)
    })
