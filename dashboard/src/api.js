const BASE = "/api"

export async function getArticles() {
    const res = await fetch(`${BASE}/articles`)
    return res.json()
}

export async function getArticle(id) {
    const res = await fetch(`${BASE}/articles/${id}`)
    return res.json()
}

export async function createArticle(data) {
    const res = await fetch(`${BASE}/articles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return res.json()
}

export async function updateArticle(id, data) {
    const res = await fetch(`${BASE}/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return res.json()
}

export async function deleteArticle(id) {
    await fetch(`${BASE}/articles/${id}`, { method: "DELETE" })
}

export async function getArticleTypes() {
    const res = await fetch(`${BASE}/article-types`)
    return res.json()
}

export async function createArticleType(name) {
    const res = await fetch(`${BASE}/article-types`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    })
    return res.json()
}

export async function deleteArticleType(id) {
    await fetch(`${BASE}/article-types/${id}`, { method: "DELETE" })
}

export async function cleanArticleTags() {
    const res = await fetch(`${BASE}/article-types/clean`, { method: "POST" })
    return res.json()
}

export async function getBooks() {
    const res = await fetch(`${BASE}/books`)
    return res.json()
}

export async function searchBooks(q) {
    const res = await fetch(`${BASE}/books/search?q=${encodeURIComponent(q)}`)
    return res.json()
}

export async function createBook(data) {
    const res = await fetch(`${BASE}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return res.json()
}

export async function deleteBook(id) {
    await fetch(`${BASE}/books/${id}`, { method: "DELETE" })
}

export async function updateBook(id, data) {
    const res = await fetch(`${BASE}/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return res.json()
}

export async function getProjects() {
    const res = await fetch(`${BASE}/projects`)
    return res.json()
}

export async function getProject(id) {
    const res = await fetch(`${BASE}/projects/${id}`)
    return res.json()
}

export async function createProject(data) {
    const res = await fetch(`${BASE}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return res.json()
}

export async function updateProject(id, data) {
    const res = await fetch(`${BASE}/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return res.json()
}

export async function deleteProject(id) {
    await fetch(`${BASE}/projects/${id}`, { method: "DELETE" })
}

export async function getProfile() {
    const res = await fetch(`${BASE}/profile`)
    return res.json()
}

export async function updateProfile(data) {
    const res = await fetch(`${BASE}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return res.json()
}
