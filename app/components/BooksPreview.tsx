import { Link } from "react-router"

const placeholderBooks = [
    { title: "The Pragmatic Programmer", author: "David Thomas & Andrew Hunt" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman" },
    { title: "A Philosophy of Software Design", author: "John Ousterhout" },
]

export default function BooksPreview() {
    return (
        <div className="col-span-12 @md:col-span-6 flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
                <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                    Books
                </h2>
                <Link
                    to="/books"
                    className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                    View all
                </Link>
            </div>
            <div className="flex flex-col gap-2">
                {placeholderBooks.map((book) => (
                    <div
                        key={book.title}
                        className="rounded-xl border bg-card px-4 py-3"
                    >
                        <p className="text-sm font-medium">{book.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
