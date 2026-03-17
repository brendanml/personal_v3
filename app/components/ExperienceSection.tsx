import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "~/components/ui/card"
import type { ExperienceSection, ExperienceEntry } from "~/types"
import { cardHoverStyles } from "~/lib/styles"
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward"

const ExperienceCard = ({ entry }: { entry: ExperienceEntry }) => (
    <Card className={`group ${cardHoverStyles}`}>
        <CardHeader>
            <div className="flex items-start justify-between">
                <CardTitle className="leading-snug">
                    <span className={`inline-flex items-center gap-1 border-b border-transparent transition-colors duration-300 ${entry.url ? "group-hover:border-pop-text-secondary" : ""}`}>
                        <span className={`transition-colors duration-300 ${entry.url ? "group-hover:text-pop-text" : ""}`}>
                            {entry.url ? (
                                <a
                                    href={entry.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {entry.title}
                                </a>
                            ) : (
                                entry.title
                            )}
                        </span>
                        {entry.url && (
                            <ArrowOutwardIcon
                                fontSize="inherit"
                                className="opacity-0 -translate-x-1 translate-y-1 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-pop-text"
                            />
                        )}
                    </span>
                </CardTitle>
                <span className="text-sm text-muted-foreground shrink-0">
                    {entry.date}
                </span>
            </div>
            {entry.subtitle && (
                <CardDescription>{entry.subtitle}</CardDescription>
            )}
        </CardHeader>
        {(entry.description || entry.tags) && (
            <CardContent className="flex flex-col">
                {entry.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {entry.description}
                    </p>
                )}
                {entry.tags && entry.tags.length > 0 && (
                    <div
                        className={`flex flex-wrap gap-2 ${entry.description ? "mt-4" : ""}`}
                    >
                        {entry.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded-md bg-pop text-pop-text"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </CardContent>
        )}
        {entry.links && entry.links.length > 0 && (
            <CardFooter className="gap-3">
                {entry.links.map(({ label, url }) => (
                    <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm underline underline-offset-4"
                    >
                        {label}
                    </a>
                ))}
            </CardFooter>
        )}
    </Card>
)

export default function ExperienceSection({
    section,
}: {
    section: ExperienceSection
}) {
    return (
        <div
            id={section.id}
            data-section-label={section.label}
            className="flex flex-col gap-5 scroll-mt-20"
        >
            <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                {section.heading}
            </h3>
            {section.entries.map((entry, i) => (
                <ExperienceCard key={i} entry={entry} />
            ))}
        </div>
    )
}
