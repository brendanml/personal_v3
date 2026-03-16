import { useLoaderData, data } from "react-router"
import type { Route } from "./+types/articles.$slug"
import Page from "~/components/Page"
import { getArticle } from "~/utils/articles.server"
import { Link } from "react-router"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

export async function loader({ params }: Route.LoaderArgs) {
    const article = await getArticle(params.slug)
    if (!article) throw data(null, { status: 404 })
    return { article }
}

export default function ArticlePage() {
    const { article } = useLoaderData<typeof loader>()

    return (
        <Page>
            <div className="col-span-12 md:col-span-8 md:col-start-3 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <Link
                        to="/articles"
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                    >
                        <ArrowBackIcon fontSize="inherit" />
                        All articles
                    </Link>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {article.tags.map((tag, i) => (
                                <span key={tag}>
                                    <span className="text-pop-text font-medium">{tag}</span>
                                    {i < article.tags.length - 1 && <span className="ml-2">·</span>}
                                </span>
                            ))}
                            <span>·</span>
                            <span>{new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</span>
                            <span>·</span>
                            <span>{article.readTime}</span>
                        </div>
                        <h1 className="text-3xl font-secondary leading-tight">{article.title}</h1>
                    </div>
                </div>

                <article
                    className="prose prose-neutral dark:prose-invert max-w-none
                        prose-headings:font-secondary prose-headings:tracking-wide
                        prose-p:leading-relaxed prose-p:text-foreground/80
                        prose-a:text-pop-text prose-a:no-underline hover:prose-a:underline
                        prose-code:text-pop-text prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                        prose-pre:bg-muted prose-pre:border prose-pre:border-border
                        prose-strong:text-foreground
                        prose-li:text-foreground/80"
                    dangerouslySetInnerHTML={{ __html: article.html }}
                />
            </div>
        </Page>
    )
}
