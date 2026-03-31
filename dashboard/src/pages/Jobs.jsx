import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getJobs, deleteJob } from "../api"
import { Button } from "../components/ui/button"

export default function Jobs() {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        getJobs().then(setJobs)
    }, [])

    async function handleDelete(id, title) {
        if (!confirm(`Delete "${title}"?`)) return
        await deleteJob(id)
        setJobs((prev) => prev.filter((j) => j._id !== id))
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-semibold m-0">Work Experience</h1>
                <Button
                    className="bg-pop-text text-background hover:bg-pop-text/90 font-semibold"
                    onClick={() => navigate("/jobs/new")}
                >
                    New job
                </Button>
            </div>

            <div className="flex flex-col gap-2 max-w-2xl">
                {jobs.map((j) => (
                    <div
                        key={j._id}
                        className="flex items-center justify-between p-3 rounded-md border border-border bg-card"
                    >
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium">{j.company}</span>
                            <span className="text-xs text-muted-foreground">
                                {j.title} · {j.startDate}{j.endDate ? ` – ${j.endDate}` : " – Present"}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate(`/jobs/${j._id}/edit`)}
                            >
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDelete(j._id, `${j.title} at ${j.company}`)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
                {jobs.length === 0 && (
                    <p className="text-sm text-muted-foreground">No jobs yet.</p>
                )}
            </div>
        </div>
    )
}
