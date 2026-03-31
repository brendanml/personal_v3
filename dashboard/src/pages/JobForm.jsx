import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getJob, createJob, updateJob } from "../api"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"

const empty = {
    title: "",
    company: "",
    url: "",
    location: "",
    startDate: "",
    endDate: "",
    years: "",
    description: "",
    tags: "",
    persona: "technical",
}

export default function JobForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = !!id

    const [form, setForm] = useState(empty)
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (!isEdit) return
        getJob(id).then((j) => {
            setForm({
                ...j,
                tags: (j.tags ?? []).join(", "),
                endDate: j.endDate ?? "",
            })
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
            endDate: form.endDate || null,
            tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        }

        try {
            if (isEdit) {
                await updateJob(id, payload)
            } else {
                await createJob(payload)
            }
            navigate("/jobs")
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
                    href="/jobs"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    onClick={(e) => {
                        e.preventDefault()
                        navigate("/jobs")
                    }}
                >
                    ← Work Experience
                </a>
                <h1 className="text-xl font-semibold m-0">
                    {isEdit ? "Edit job" : "New job"}
                </h1>
            </div>

            <form className="flex flex-col gap-5 max-w-2xl" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Company</Label>
                        <Input
                            value={form.company}
                            onChange={(e) => set("company", e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Title</Label>
                        <Input
                            value={form.title}
                            onChange={(e) => set("title", e.target.value)}
                            required
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
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Location</Label>
                        <Input
                            value={form.location}
                            onChange={(e) => set("location", e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Start date</Label>
                        <Input
                            value={form.startDate}
                            onChange={(e) => set("startDate", e.target.value)}
                            placeholder="e.g. 2022-01-01"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>End date</Label>
                        <Input
                            value={form.endDate}
                            onChange={(e) => set("endDate", e.target.value)}
                            placeholder="Leave blank if current"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 w-32">
                        <Label>Years</Label>
                        <Input
                            value={form.years}
                            onChange={(e) => set("years", e.target.value)}
                            placeholder="e.g. 2 yrs"
                            required
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Label>Tags</Label>
                        <Input
                            value={form.tags}
                            onChange={(e) => set("tags", e.target.value)}
                            placeholder="Comma-separated, e.g. React, Node.js"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 w-36">
                        <Label>Persona</Label>
                        <select
                            className="h-9 w-full rounded-md border border-input bg-input/30 px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            value={form.persona}
                            onChange={(e) => set("persona", e.target.value)}
                        >
                            <option value="technical">Technical</option>
                            <option value="fun">Fun</option>
                        </select>
                    </div>
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
                        onClick={() => navigate("/jobs")}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}
