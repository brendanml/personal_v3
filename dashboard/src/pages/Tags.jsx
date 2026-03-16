import { useEffect, useState } from "react"
import { getArticleTypes, createArticleType, deleteArticleType, cleanArticleTags } from "../api"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function Tags() {
    const [types, setTypes] = useState([])
    const [newName, setNewName] = useState("")
    const [cleanMsg, setCleanMsg] = useState("")

    useEffect(() => { getArticleTypes().then(setTypes) }, [])

    async function handleAdd() {
        const name = newName.trim()
        if (!name) return
        const created = await createArticleType(name)
        if (!created.error) {
            setTypes((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)))
            setNewName("")
        }
    }

    async function handleClean() {
        setCleanMsg("")
        const result = await cleanArticleTags()
        setCleanMsg(`Cleaned ${result.cleaned} article${result.cleaned !== 1 ? "s" : ""}`)
    }

    async function handleDelete(id) {
        await deleteArticleType(id)
        setTypes((prev) => prev.filter((t) => t._id !== id))
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold m-0">Tags</h1>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={handleClean}>
                        Clean articles
                    </Button>
                    {cleanMsg && (
                        <span className="text-sm text-pop-text">{cleanMsg}</span>
                    )}
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                <Input
                    className="flex-1"
                    placeholder="New tag (e.g. Electronics)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleAdd() }}
                />
                <Button
                    className="bg-pop-text text-background hover:bg-pop-text/90 font-semibold"
                    onClick={handleAdd}
                >
                    Add
                </Button>
            </div>

            <div className="flex flex-col gap-1">
                {types.length === 0 && (
                    <p className="text-sm text-muted-foreground py-4">No tags yet.</p>
                )}
                {types.map((t) => (
                    <div
                        key={t._id}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-md bg-card border border-border"
                    >
                        <span className="text-sm">{t.name}</span>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive border-destructive/40 hover:bg-destructive/10"
                            onClick={() => handleDelete(t._id)}
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
