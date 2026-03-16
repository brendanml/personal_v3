import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getArticle, createArticle, updateArticle, getArticleTypes, createArticleType, deleteArticleType, getBooks, updateBook } from "../api"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { cn } from "../lib/utils"

const empty = { title: "", slug: "", date: "", tags: [], thumbnail: "", content: "", published: false, book: "" }

function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")
}

export default function ArticleForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = !!id

    const [form, setForm] = useState(empty)
    const [originalBook, setOriginalBook] = useState("")
    const [slugTouched, setSlugTouched] = useState(false)
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

    const [articleTypes, setArticleTypes] = useState([])
    const [newTypeName, setNewTypeName] = useState("")
    const [books, setBooks] = useState([])

    useEffect(() => {
        getArticleTypes().then(setArticleTypes)
        getBooks().then(setBooks)
        if (!isEdit) return
        getArticle(id).then((a) => {
            const bookId = a.book ?? ""
            setForm({ ...a, tags: a.tags ?? [], book: bookId })
            setOriginalBook(bookId)
            setSlugTouched(true)
        })
    }, [id])

    function set(key, value) {
        setForm((prev) => {
            const next = { ...prev, [key]: value }
            if (key === "title" && !slugTouched) next.slug = slugify(value)
            return next
        })
    }

    function toggleTag(name) {
        setForm((prev) => {
            const tags = prev.tags.includes(name)
                ? prev.tags.filter((t) => t !== name)
                : [...prev.tags, name]
            return { ...prev, tags }
        })
    }

    async function handleAddType() {
        const name = newTypeName.trim()
        if (!name) return
        const created = await createArticleType(name)
        if (!created.error) {
            setArticleTypes((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)))
            setNewTypeName("")
        }
    }

    async function handleDeleteType(typeId, name) {
        if (!confirm(`Delete type "${name}"?`)) return
        await deleteArticleType(typeId)
        setArticleTypes((prev) => prev.filter((t) => t._id !== typeId))
        setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== name) }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setSaving(true)

        const payload = {
            ...form,
            book: form.book || null,
        }

        try {
            if (isEdit) {
                await updateArticle(id, payload)
            } else {
                await createArticle(payload)
            }

            // Sync Book.article links
            if (originalBook && originalBook !== form.book) {
                await updateBook(originalBook, { article: "" })
            }
            if (form.book) {
                await updateBook(form.book, { article: `/articles/${form.slug}` })
            }

            navigate("/articles")
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <a
                    href="/articles"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    onClick={(e) => { e.preventDefault(); navigate("/articles") }}
                >
                    ← Articles
                </a>
                <h1 className="text-xl font-semibold m-0">{isEdit ? "Edit article" : "New article"}</h1>
            </div>

            <form className="flex flex-col gap-5 max-w-2xl" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Title</Label>
                        <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Slug</Label>
                        <Input
                            value={form.slug}
                            onChange={(e) => { setSlugTouched(true); set("slug", e.target.value) }}
                            readOnly={isEdit}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Date</Label>
                        <Input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-2 p-2.5 rounded-md border border-input bg-input/30 min-h-10.5">
                            {articleTypes.map((t) => (
                                <span
                                    key={t._id}
                                    className={cn(
                                        "inline-flex items-center gap-1 px-2.5 py-1 rounded border text-sm cursor-pointer select-none transition-colors",
                                        form.tags.includes(t.name)
                                            ? "bg-pop/20 border-pop-text text-pop-text"
                                            : "border-border bg-secondary text-foreground hover:bg-secondary/80"
                                    )}
                                    onClick={() => toggleTag(t.name)}
                                >
                                    {t.name}
                                    <button
                                        type="button"
                                        className="text-destructive hover:text-destructive/80 text-xs leading-none"
                                        onClick={(e) => { e.stopPropagation(); handleDeleteType(t._id, t.name) }}
                                        title="Delete type"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-1">
                            <Input
                                className="flex-1"
                                placeholder="New type (e.g. Electronics)"
                                value={newTypeName}
                                onChange={(e) => setNewTypeName(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddType() } }}
                            />
                            <Button
                                type="button"
                                size="sm"
                                className="bg-pop-text text-background hover:bg-pop-text/90 font-semibold"
                                onClick={handleAddType}
                            >
                                Add
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Thumbnail URL</Label>
                        <Input value={form.thumbnail ?? ""} onChange={(e) => set("thumbnail", e.target.value)} placeholder="https://..." />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Related Book</Label>
                        <select
                            className="h-9 w-full rounded-md border border-input bg-input/30 px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            value={form.book}
                            onChange={(e) => set("book", e.target.value)}
                        >
                            <option value="">— None —</option>
                            {books.map((b) => (
                                <option key={b._id} value={b._id}>{b.title}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label>Content (Markdown)</Label>
                    <Textarea
                        className="font-mono text-sm resize-y min-h-96"
                        value={form.content}
                        onChange={(e) => set("content", e.target.value)}
                    />
                </div>

                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input
                        type="checkbox"
                        className="rounded border-input"
                        checked={form.published}
                        onChange={(e) => set("published", e.target.checked)}
                    />
                    Published
                </label>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex gap-3 pt-2">
                    <Button
                        type="submit"
                        className="bg-pop-text text-background hover:bg-pop-text/90 font-semibold"
                        disabled={saving}
                    >
                        {saving ? "Saving…" : "Save"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/articles")}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}
