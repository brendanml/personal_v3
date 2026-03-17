import { useEffect, useState, useRef } from "react"
import {
    getBooks,
    searchBooks,
    createBook,
    deleteBook,
    updateBook,
    getArticles,
} from "../api"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "../components/ui/table"

const PERSONAS = ["fun", "technical"]

const emptyForm = {
    shortTitle: "",
    thoughts: "",
    progress: 0,
    persona: "fun",
    date: "",
}

function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value)
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(t)
    }, [value, delay])
    return debounced
}

function SelectField({ label, value, onChange, options }) {
    return (
        <div className="flex flex-col gap-1.5 flex-1">
            <Label>{label}</Label>
            <select
                className="h-9 w-full rounded-md border border-input bg-input/30 px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                value={value}
                onChange={onChange}
            >
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default function Books() {
    const [books, setBooks] = useState([])
    const [articles, setArticles] = useState([])

    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [searching, setSearching] = useState(false)
    const [selected, setSelected] = useState(null)
    const [addForm, setAddForm] = useState(emptyForm)

    const [editingBook, setEditingBook] = useState(null)
    const [editForm, setEditForm] = useState({})

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const searchRef = useRef(null)
    const debouncedQuery = useDebounce(query, 350)

    useEffect(() => {
        getBooks().then(setBooks)
        getArticles().then(setArticles)
    }, [])

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSuggestions([])
            return
        }
        setSearching(true)
        searchBooks(debouncedQuery)
            .then(setSuggestions)
            .finally(() => setSearching(false))
    }, [debouncedQuery])

    function handleSelect(result) {
        setSelected(result)
        setAddForm({ ...emptyForm, shortTitle: result.title.slice(0, 35) })
        setSuggestions([])
        setQuery("")
        setError("")
    }

    function handleAddCancel() {
        setSelected(null)
        setAddForm(emptyForm)
        setError("")
    }

    async function handleAddSave(e) {
        e.preventDefault()
        setSaving(true)
        setError("")
        try {
            const book = await createBook({
                title: selected.title,
                shortTitle: addForm.shortTitle,
                author: selected.author,
                cover: selected.cover ?? null,
                thoughts: addForm.thoughts,
                progress: Number(addForm.progress),
                persona: addForm.persona,
                date: addForm.date || undefined,
            })
            if (book.error) throw new Error(book.error)
            setBooks((prev) => [book, ...prev])
            handleAddCancel()
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    function handleEdit(book) {
        setEditingBook(book)
        setEditForm({
            title: book.title ?? "",
            shortTitle: book.shortTitle ?? "",
            author: book.author ?? "",
            cover: book.cover ?? "",
            thoughts: book.thoughts ?? "",
            progress: book.progress ?? 0,
            persona: book.persona ?? "fun",
            date: book.date ?? "",
            article: book.article ?? "",
        })
        setSelected(null)
        setError("")
    }

    function handleEditCancel() {
        setEditingBook(null)
        setEditForm({})
        setError("")
    }

    async function handleEditSave(e) {
        e.preventDefault()
        setSaving(true)
        setError("")
        try {
            const updated = await updateBook(editingBook._id, {
                ...editForm,
                progress: Number(editForm.progress),
                cover: editForm.cover || null,
                date: editForm.date || undefined,
            })
            if (updated.error) throw new Error(updated.error)
            setBooks((prev) =>
                prev.map((b) => (b._id === updated._id ? updated : b)),
            )
            handleEditCancel()
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(id) {
        await deleteBook(id)
        setBooks((prev) => prev.filter((b) => b._id !== id))
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold m-0">Books</h1>
            </div>

            {/* Search (hidden while editing) */}
            {!selected && !editingBook && (
                <div className="relative max-w-md mb-8" ref={searchRef}>
                    <Input
                        placeholder="Search for books..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {(suggestions.length > 0 || query) && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-10 overflow-hidden">
                            {(searching ||
                                (query.trim() && !suggestions.length)) && (
                                <div className="px-3 py-2 text-sm text-muted-foreground">
                                    Searching…
                                </div>
                            )}
                            {suggestions.map((s) => (
                                <button
                                    key={s.olKey}
                                    type="button"
                                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-secondary transition-colors"
                                    onClick={() => handleSelect(s)}
                                >
                                    {s.cover ? (
                                        <img
                                            src={s.cover}
                                            alt=""
                                            className="w-8 h-11 object-cover rounded-sm shrink-0 bg-muted"
                                        />
                                    ) : (
                                        <div className="w-8 h-11 rounded-sm bg-muted shrink-0" />
                                    )}
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-medium truncate">
                                            {s.title}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {s.author}
                                            {s.year ? ` · ${s.year}` : ""}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Add form */}
            {selected && (
                <form
                    onSubmit={handleAddSave}
                    className="max-w-lg mb-8 p-4 border border-border rounded-lg bg-card flex flex-col gap-4"
                >
                    <div className="flex items-center gap-3">
                        {selected.cover ? (
                            <img
                                src={selected.cover}
                                alt=""
                                className="w-12 h-16 object-cover rounded-sm shrink-0 bg-muted"
                            />
                        ) : (
                            <div className="w-12 h-16 rounded-sm bg-muted shrink-0" />
                        )}
                        <div>
                            <p className="text-sm font-medium">
                                {selected.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {selected.author}
                                {selected.year ? ` · ${selected.year}` : ""}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Short title</Label>
                            <Input
                                value={addForm.shortTitle}
                                onChange={(e) =>
                                    setAddForm((p) => ({
                                        ...p,
                                        shortTitle: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 w-24">
                            <Label>Progress %</Label>
                            <Input
                                type="number"
                                min={0}
                                max={100}
                                value={addForm.progress}
                                onChange={(e) =>
                                    setAddForm((p) => ({
                                        ...p,
                                        progress: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <SelectField
                            label="Persona"
                            value={addForm.persona}
                            onChange={(e) =>
                                setAddForm((p) => ({
                                    ...p,
                                    persona: e.target.value,
                                }))
                            }
                            options={PERSONAS}
                        />
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Date finished</Label>
                            <Input
                                type="date"
                                value={addForm.date}
                                onChange={(e) =>
                                    setAddForm((p) => ({
                                        ...p,
                                        date: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label>Thoughts</Label>
                        <Input
                            value={addForm.thoughts}
                            onChange={(e) =>
                                setAddForm((p) => ({
                                    ...p,
                                    thoughts: e.target.value,
                                }))
                            }
                            placeholder="One-line take…"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}

                    <div className="flex gap-3">
                        <Button
                            type="submit"
                            className="bg-pop-text text-background hover:bg-pop-text/90 font-semibold"
                            disabled={saving}
                        >
                            {saving ? "Saving…" : "Add book"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleAddCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            )}

            {/* Edit form */}
            {editingBook && (
                <form
                    onSubmit={handleEditSave}
                    className="max-w-lg mb-8 p-4 border border-border rounded-lg bg-card flex flex-col gap-4"
                >
                    <p className="text-sm font-medium text-muted-foreground">
                        Editing book
                    </p>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Title</Label>
                            <Input
                                value={editForm.title}
                                onChange={(e) =>
                                    setEditForm((p) => ({
                                        ...p,
                                        title: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Short title</Label>
                            <Input
                                value={editForm.shortTitle}
                                onChange={(e) =>
                                    setEditForm((p) => ({
                                        ...p,
                                        shortTitle: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Author</Label>
                            <Input
                                value={editForm.author}
                                onChange={(e) =>
                                    setEditForm((p) => ({
                                        ...p,
                                        author: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1.5 w-24">
                            <Label>Progress %</Label>
                            <Input
                                type="number"
                                min={0}
                                max={100}
                                value={editForm.progress}
                                onChange={(e) =>
                                    setEditForm((p) => ({
                                        ...p,
                                        progress: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <SelectField
                            label="Persona"
                            value={editForm.persona}
                            onChange={(e) =>
                                setEditForm((p) => ({
                                    ...p,
                                    persona: e.target.value,
                                }))
                            }
                            options={PERSONAS}
                        />
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Date finished</Label>
                            <Input
                                type="date"
                                value={editForm.date}
                                onChange={(e) =>
                                    setEditForm((p) => ({
                                        ...p,
                                        date: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label>Cover URL</Label>
                        <Input
                            value={editForm.cover}
                            onChange={(e) =>
                                setEditForm((p) => ({
                                    ...p,
                                    cover: e.target.value,
                                }))
                            }
                            placeholder="https://…"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label>Thoughts</Label>
                        <Input
                            value={editForm.thoughts}
                            onChange={(e) =>
                                setEditForm((p) => ({
                                    ...p,
                                    thoughts: e.target.value,
                                }))
                            }
                            placeholder="One-line take…"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label>Linked article</Label>
                        <input
                            list="article-slugs"
                            className="h-9 w-full rounded-md border border-input bg-input/30 px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 placeholder:text-muted-foreground"
                            placeholder="— None —"
                            value={editForm.article}
                            onChange={(e) =>
                                setEditForm((p) => ({
                                    ...p,
                                    article: e.target.value,
                                }))
                            }
                        />
                        <datalist id="article-slugs">
                            {articles.map((a) => (
                                <option
                                    key={a._id}
                                    value={`/articles/${a.slug}`}
                                >
                                    {a.title}
                                </option>
                            ))}
                        </datalist>
                    </div>

                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}

                    <div className="flex gap-3">
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
                            onClick={handleEditCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            )}

            {/* Books table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">Cover</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Persona</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books.map((b) => (
                        <TableRow
                            key={b._id}
                            className={
                                editingBook?._id === b._id
                                    ? "bg-secondary/30"
                                    : ""
                            }
                        >
                            <TableCell>
                                {b.cover ? (
                                    <img
                                        src={b.cover}
                                        alt=""
                                        className="w-8 h-11 object-cover rounded-sm bg-muted"
                                    />
                                ) : (
                                    <div className="w-8 h-11 rounded-sm bg-muted" />
                                )}
                            </TableCell>
                            <TableCell className="font-medium whitespace-normal">
                                {b.title}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {b.author}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {b.progress}%
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {b.persona ?? "—"}
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(b)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-destructive border-destructive/40 hover:bg-destructive/10"
                                        onClick={() => handleDelete(b._id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
