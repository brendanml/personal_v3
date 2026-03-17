import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProjects, deleteProject } from "../api"
import { Button } from "../components/ui/button"

const IMPORTANCE_ORDER = { high: 0, medium: 1, low: 2, backlog: 3 }

export default function Projects() {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getProjects().then((data) =>
            setProjects([...data].sort((a, b) => IMPORTANCE_ORDER[a.importance] - IMPORTANCE_ORDER[b.importance]))
        )
    }, [])

    async function handleDelete(id, name) {
        if (!confirm(`Delete "${name}"?`)) return
        await deleteProject(id)
        setProjects((prev) => prev.filter((p) => p._id !== id))
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-semibold m-0">Projects</h1>
                <Button
                    className="bg-pop-text text-background hover:bg-pop-text/90 font-semibold"
                    onClick={() => navigate("/projects/new")}
                >
                    New project
                </Button>
            </div>

            <div className="flex flex-col gap-2 max-w-2xl">
                {projects.map((p) => (
                    <div
                        key={p._id}
                        className="flex items-center justify-between p-3 rounded-md border border-border bg-card"
                    >
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium">{p.name}</span>
                            <span className="text-xs text-muted-foreground">
                                {p.startDate}{p.endDate ? ` – ${p.endDate}` : ""} · {p.importance}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate(`/projects/${p._id}/edit`)}
                            >
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDelete(p._id, p.name)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <p className="text-sm text-muted-foreground">No projects yet.</p>
                )}
            </div>
        </div>
    )
}
