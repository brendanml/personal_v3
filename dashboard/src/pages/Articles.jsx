import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getArticles, deleteArticle } from "../api"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "../components/ui/table"

export default function Articles() {
    const [articles, setArticles] = useState([])
    const navigate = useNavigate()

    useEffect(() => { getArticles().then(setArticles) }, [])

    async function handleDelete(id, title) {
        if (!confirm(`Delete "${title}"?`)) return
        await deleteArticle(id)
        setArticles((prev) => prev.filter((a) => a._id !== id))
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold m-0">Articles</h1>
                <Button
                    className="bg-pop-text text-background hover:bg-pop-text/90 font-semibold"
                    onClick={() => navigate("/articles/new")}
                >
                    New article
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {articles.map((a) => (
                        <TableRow key={a._id}>
                            <TableCell className="font-medium">{a.title}</TableCell>
                            <TableCell className="text-muted-foreground font-mono text-xs">{a.slug}</TableCell>
                            <TableCell className="text-muted-foreground">{a.date}</TableCell>
                            <TableCell>
                                {a.published ? (
                                    <Badge className="bg-green-950 text-green-300 border-green-800">
                                        Published
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary" className="text-muted-foreground">
                                        Draft
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => navigate(`/articles/${a._id}/edit`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-destructive border-destructive/40 hover:bg-destructive/10"
                                        onClick={() => handleDelete(a._id, a.title)}
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
