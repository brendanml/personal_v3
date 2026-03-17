import { useEffect, useState } from "react"
import { getProfile, updateProfile } from "../api"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"

const empty = {
    firstName: "", middleName: "", lastName: "",
    location: "", born: "", yearsOfExperience: "",
    socials: { linkedin: "", youtube: "", email: "", github: "" },
    about: { fun: "", technical: "" },
    tag: { fun: "", technical: "" },
    school: { name: "", degree: "", startDate: "", endDate: "", url: "", courses: "", transcript: "" },
    skills: { languages: "", frontend: "", backend: "", databases: "", testing: "", tools: "" },
}

function toComma(arr) {
    return (arr ?? []).join(", ")
}

function fromComma(str) {
    return str ? str.split(",").map((s) => s.trim()).filter(Boolean) : []
}

export default function Profile() {
    const [form, setForm] = useState(empty)
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        getProfile().then((p) => {
            if (!p) return
            setForm({
                ...p,
                school: { ...p.school, courses: toComma(p.school?.courses) },
                skills: {
                    languages: toComma(p.skills?.languages),
                    frontend: toComma(p.skills?.frontend),
                    backend: toComma(p.skills?.backend),
                    databases: toComma(p.skills?.databases),
                    testing: toComma(p.skills?.testing),
                    tools: toComma(p.skills?.tools),
                },
            })
        })
    }, [])

    function set(key, value) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    function setNested(section, key, value) {
        setForm((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setSaving(true)
        setSaved(false)

        const payload = {
            ...form,
            school: { ...form.school, courses: fromComma(form.school.courses) },
            skills: {
                languages: fromComma(form.skills.languages),
                frontend: fromComma(form.skills.frontend),
                backend: fromComma(form.skills.backend),
                databases: fromComma(form.skills.databases),
                testing: fromComma(form.skills.testing),
                tools: fromComma(form.skills.tools),
            },
        }

        try {
            await updateProfile(payload)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div>
            <h1 className="text-xl font-semibold mb-8">Profile</h1>

            <form className="flex flex-col gap-8 max-w-2xl" onSubmit={handleSubmit}>

                {/* Basic info */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Basic</h2>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>First name</Label>
                            <Input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Middle name</Label>
                            <Input value={form.middleName} onChange={(e) => set("middleName", e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Last name</Label>
                            <Input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Location</Label>
                            <Input value={form.location} onChange={(e) => set("location", e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Born</Label>
                            <Input value={form.born} onChange={(e) => set("born", e.target.value)} placeholder="e.g. 2000-01-01" />
                        </div>
                        <div className="flex flex-col gap-1.5 w-40">
                            <Label>Years of experience</Label>
                            <Input type="number" value={form.yearsOfExperience} onChange={(e) => set("yearsOfExperience", e.target.value)} />
                        </div>
                    </div>
                </section>

                {/* Socials */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Socials</h2>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>GitHub</Label>
                            <Input value={form.socials.github} onChange={(e) => setNested("socials", "github", e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>LinkedIn</Label>
                            <Input value={form.socials.linkedin} onChange={(e) => setNested("socials", "linkedin", e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>YouTube</Label>
                            <Input value={form.socials.youtube} onChange={(e) => setNested("socials", "youtube", e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Email</Label>
                            <Input value={form.socials.email} onChange={(e) => setNested("socials", "email", e.target.value)} />
                        </div>
                    </div>
                </section>

                {/* About */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">About</h2>
                    <div className="flex flex-col gap-1.5">
                        <Label>Fun</Label>
                        <Textarea className="resize-y min-h-24" value={form.about.fun} onChange={(e) => setNested("about", "fun", e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Technical</Label>
                        <Textarea className="resize-y min-h-24" value={form.about.technical} onChange={(e) => setNested("about", "technical", e.target.value)} />
                    </div>
                </section>

                {/* Tag */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Tag line</h2>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Fun</Label>
                            <Input value={form.tag.fun} onChange={(e) => setNested("tag", "fun", e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Technical</Label>
                            <Input value={form.tag.technical} onChange={(e) => setNested("tag", "technical", e.target.value)} />
                        </div>
                    </div>
                </section>

                {/* School */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Education</h2>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>School name</Label>
                            <Input value={form.school.name} onChange={(e) => setNested("school", "name", e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Degree</Label>
                            <Input value={form.school.degree} onChange={(e) => setNested("school", "degree", e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Start date</Label>
                            <Input value={form.school.startDate} onChange={(e) => setNested("school", "startDate", e.target.value)} placeholder="e.g. 2018-09-01" />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>End date</Label>
                            <Input value={form.school.endDate} onChange={(e) => setNested("school", "endDate", e.target.value)} placeholder="e.g. 2022-05-01" />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>URL</Label>
                            <Input value={form.school.url} onChange={(e) => setNested("school", "url", e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Courses</Label>
                            <Input value={form.school.courses} onChange={(e) => setNested("school", "courses", e.target.value)} placeholder="Comma-separated" />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <Label>Transcript URL</Label>
                            <Input value={form.school.transcript ?? ""} onChange={(e) => setNested("school", "transcript", e.target.value)} />
                        </div>
                    </div>
                </section>

                {/* Skills */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Skills</h2>
                    {["languages", "frontend", "backend", "databases", "testing", "tools"].map((key) => (
                        <div key={key} className="flex flex-col gap-1.5">
                            <Label className="capitalize">{key}</Label>
                            <Input
                                value={form.skills[key]}
                                onChange={(e) => setNested("skills", key, e.target.value)}
                                placeholder="Comma-separated"
                            />
                        </div>
                    ))}
                </section>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex items-center gap-3 pt-2">
                    <Button
                        type="submit"
                        className="bg-pop-text text-background hover:bg-pop-text/90 font-semibold"
                        disabled={saving}
                    >
                        {saving ? "Saving…" : "Save"}
                    </Button>
                    {saved && <span className="text-sm text-muted-foreground">Saved.</span>}
                </div>
            </form>
        </div>
    )
}
