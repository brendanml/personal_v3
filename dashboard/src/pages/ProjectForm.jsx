import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProject, createProject, updateProject } from "../api"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"

const empty = {
    name: "",
    type: "dev",
    url: "",
    github: "",
    blog: "",
    youtube: "",
    startDate: "",
    endDate: "",
    description: "",
    tags: "",
    importance: "high",
}

export default function ProjectForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = !!id

    const [form, setForm] = useState(empty)
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (!isEdit) return
        getProject(id).then((p) => {
            setForm({ ...p, tags: (p.tags ?? []).join(", "), url: p.url ?? "", github: p.github ?? "", blog: p.blog ?? "", youtube: p.youtube ?? "", endDate: p.endDate ?? "" })
        })
    }, [id])

    function set(key, value) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setSaving(true)

        const payload = {
            ...form,
            url: form.url || null,
            github: form.github || null,
            blog: form.blog || null,
            youtube: form.youtube || null,
            endDate: form.endDate || null,
            tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        }

        try {
            if (isEdit) {
                await updateProject(id, payload)
            } else {
                await createProject(payload)
            }
            navigate("/projects")
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
                    href="/projects"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    onClick={(e) => {
                        e.preventDefault()
                        navigate("/projects")
                    }}
                >
                    ← Projects
                </a>
                <h1 className="text-xl font-semibold m-0">
                    {isEdit ? "Edit project" : "New project"}
                </h1>
            </div>

            <form className="flex flex-col gap-5 max-w-2xl" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Name</Label>
                        <Input
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 w-36">
                        <Label>Importance</Label>
                        <select
                            className="h-9 w-full rounded-md border border-input bg-input/30 px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            value={form.importance}
                            onChange={(e) => set("importance", e.target.value)}
                        >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                            <option value="backlog">Backlog</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Start date</Label>
                        <Input
                            value={form.startDate}
                            onChange={(e) => set("startDate", e.target.value)}
                            placeholder="e.g. Jan 2024"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>End date</Label>
                        <Input
                            value={form.endDate}
                            onChange={(e) => set("endDate", e.target.value)}
                            placeholder="e.g. Mar 2024 (leave blank if ongoing)"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>URL</Label>
                        <Input
                            value={form.url}
                            onChange={(e) => set("url", e.target.value)}
                            placeholder="https://..."
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>GitHub</Label>
                        <Input
                            value={form.github}
                            onChange={(e) => set("github", e.target.value)}
                            placeholder="https://github.com/..."
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Blog</Label>
                        <Input
                            value={form.blog}
                            onChange={(e) => set("blog", e.target.value)}
                            placeholder="https://..."
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>YouTube</Label>
                        <Input
                            value={form.youtube}
                            onChange={(e) => set("youtube", e.target.value)}
                            placeholder="https://youtube.com/..."
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label>Tags</Label>
                    <Input
                        value={form.tags}
                        onChange={(e) => set("tags", e.target.value)}
                        placeholder="Comma-separated, e.g. React, Node.js"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label>Description</Label>
                    <Textarea
                        className="resize-y min-h-32"
                        value={form.description}
                        onChange={(e) => set("description", e.target.value)}
                    />
                </div>

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
                        onClick={() => navigate("/projects")}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}
