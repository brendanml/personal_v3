import { useState } from "react"
import Page from "~/components/Page"
import { getBooks } from "~/utils/db"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"

type SortKey = "date" | "progress"
type SortDir = "asc" | "desc"

export default function Books() {
    const [sortKey, setSortKey] = useState<SortKey>("date")
    const [sortDir, setSortDir] = useState<SortDir>("desc")

    const allBooks = getBooks()
    const sorted = [...allBooks].sort((a, b) => {
        const dir = sortDir === "asc" ? 1 : -1
        if (sortKey === "date") {
            return ((a.date ?? "") < (b.date ?? "") ? -1 : 1) * dir
        }
        return (a.progress - b.progress) * dir
    })

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir(sortDir === "asc" ? "desc" : "asc")
        } else {
            setSortKey(key)
            setSortDir("desc")
        }
    }

    const indicator = (key: SortKey) =>
        sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : ""

    return (
        <Page>
            <div className="col-span-12 flex flex-col gap-6">
                <h1 className="text-2xl font-secondary">Books I've Read</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">Cover</TableHead>
                            {/* mobile */}
                            <TableHead className="md:hidden">Title</TableHead>
                            {/* desktop */}
                            <TableHead className="hidden md:table-cell">
                                Title
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Author
                            </TableHead>
                            <TableHead className="hidden md:table-cell w-140">
                                Thoughts
                            </TableHead>
                            <TableHead
                                className="hidden md:table-cell w-36 cursor-pointer select-none"
                                onClick={() => toggleSort("progress")}
                            >
                                Progress{indicator("progress")}
                            </TableHead>
                            <TableHead
                                className="hidden md:table-cell w-24 cursor-pointer select-none"
                                onClick={() => toggleSort("date")}
                            >
                                Date{indicator("date")}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sorted.map((book) => (
                            <TableRow key={book.title}>
                                <TableCell>
                                    <div className="relative w-10 h-14 rounded-sm bg-muted overflow-hidden shrink-0">
                                        {book.cover && (
                                            <img
                                                src={book.cover}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        <div className="absolute inset-0 rounded shadow-[inset_0_0_4px_1px_color-mix(in_oklab,var(--accent)_50%,transparent)]" />
                                    </div>
                                </TableCell>
                                {/* mobile: short title + article */}
                                <TableCell className="md:hidden font-medium">
                                    <div className="flex flex-col gap-0.5">
                                        <span>{book.shortTitle}</span>
                                        {book.article && (
                                            <a
                                                href={book.article}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-muted-foreground underline font-normal"
                                            >
                                                read article
                                            </a>
                                        )}
                                    </div>
                                </TableCell>
                                {/* desktop: full title */}
                                <TableCell className="hidden md:table-cell font-medium">
                                    {book.title}
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-muted-foreground">
                                    {book.author}
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-sm text-muted-foreground whitespace-normal">
                                    {book.thoughts || "—"}
                                    <br />
                                    {book.article && (
                                        <>
                                            {" "}
                                            <a
                                                href={book.article}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline"
                                            >
                                                read more...
                                            </a>
                                        </>
                                    )}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-pop-text transition-all duration-300"
                                            style={{ width: `${book.progress}%` }}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                                    {book.date
                                        ? new Date(book.date).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              timeZone: "UTC",
                                          })
                                        : "—"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Page>
    )
}
