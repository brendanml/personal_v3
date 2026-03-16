import { useLoaderData } from "react-router"
import { useState, useMemo } from "react"
import type { Route } from "./+types/articles"
import Page from "~/components/Page"
import { Link } from "react-router"
import { getAllArticles } from "~/utils/articles.server"
import { Card, CardHeader, CardTitle } from "~/components/ui/card"
import { cardHoverStyles } from "~/lib/styles"
import { Button } from "~/components/ui/button"

export async function loader(_: Route.LoaderArgs) {
    return { articles: await getAllArticles() }
}

export default function Articles() {
    const { articles } = useLoaderData<typeof loader>()
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    const allTags = useMemo(() => {
        const tags = new Set<string>()
        articles.forEach((a) => a.tags.forEach((t) => tags.add(t)))
        return Array.from(tags).sort()
    }, [articles])

    const filtered = selectedTag
        ? articles.filter((a) => a.tags.includes(selectedTag))
        : articles

    return (
        <Page>
            <h1 className="row-start-1 col-span-9 text-2xl font-secondary">
                Articles I've Written
            </h1>
            <div className="row-start-2 col-span-3 flex flex-col gap-3 pt-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Filter
                </p>
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`text-left text-sm px-3 py-1.5 rounded-md transition-colors ${
                        selectedTag === null
                            ? "bg-pop-text/10 text-pop-text font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                    All
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() =>
                            setSelectedTag(tag === selectedTag ? null : tag)
                        }
                        className={`text-left text-sm px-3 py-1.5 rounded-md transition-colors ${
                            selectedTag === tag
                                ? "bg-pop-text/10 text-pop-text font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div className="row-start-2 col-start-1 col-span-9 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    {filtered.map((article) => (
                        <Link
                            key={article.slug}
                            to={`/articles/${article.slug}`}
                            className="group block"
                        >
                            <Card
                                className={`${cardHoverStyles} py-0 overflow-hidden`}
                            >
                                <div className="flex items-stretch">
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <CardHeader className="pt-5 pb-5">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                {article.tags.map((tag, i) => (
                                                    <span key={tag}>
                                                        <span className="text-pop-text font-medium">
                                                            {tag}
                                                        </span>
                                                        {i <
                                                            article.tags
                                                                .length -
                                                                1 && (
                                                            <span className="ml-2">
                                                                ·
                                                            </span>
                                                        )}
                                                    </span>
                                                ))}
                                                <span>·</span>
                                                <span>
                                                    {new Date(
                                                        article.date,
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            year: "numeric",
                                                            timeZone: "UTC",
                                                        },
                                                    )}
                                                </span>
                                                <span>·</span>
                                                <span>{article.readTime}</span>
                                            </div>
                                            <CardTitle className="text-base leading-snug group-hover:text-pop-text transition-colors duration-200">
                                                {article.title}
                                            </CardTitle>
                                        </CardHeader>
                                    </div>
                                    {article.thumbnail && (
                                        <div className="hidden md:block w-32 shrink-0 m-4 rounded-sm overflow-hidden bg-muted relative">
                                            <img
                                                src={article.thumbnail}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 shadow-[inset_0_0_16px_rgba(0,0,0,0.3)] rounded-sm pointer-events-none" />
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </Page>
    )
}
