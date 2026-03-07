import { Link } from "react-router"

const placeholderArticles = [
    { title: "Why I switched to TypeScript", date: "Jan 2025" },
    { title: "Building a personal site from scratch", date: "Nov 2024" },
    { title: "What I learned shipping my first product", date: "Aug 2024" },
]

export default function ArticlesPreview() {
    return (
        <div className="col-span-12 @md:col-span-6 flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
                <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                    Articles
                </h2>
                <Link
                    to="/articles"
                    className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                    View all
                </Link>
            </div>
            <div className="flex flex-col gap-2">
                {placeholderArticles.map((article) => (
                    <div
                        key={article.title}
                        className="rounded-xl border bg-card px-4 py-3 flex items-baseline justify-between"
                    >
                        <p className="text-sm font-medium">{article.title}</p>
                        <span className="text-xs text-muted-foreground shrink-0 ml-4">{article.date}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
