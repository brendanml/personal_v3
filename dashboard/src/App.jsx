import { Routes, Route, NavLink } from "react-router-dom"
import Articles from "./pages/Articles"
import ArticleForm from "./pages/ArticleForm"
import Tags from "./pages/Tags"
import Books from "./pages/Books"
import { cn } from "./lib/utils"

export default function App() {
    return (
        <div className="flex min-h-screen">
            <aside className="w-48 shrink-0 border-r border-border flex flex-col gap-1 px-3 py-6">
                <div className="text-xs font-semibold text-muted-foreground px-2.5 mb-4 tracking-wide">
                    Dashboard
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground px-2.5 mb-1">
                    Content
                </div>
                <NavLink
                    to="/articles"
                    className={({ isActive }) =>
                        cn(
                            "block px-2.5 py-1.5 rounded-md text-sm transition-colors",
                            isActive
                                ? "bg-secondary text-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        )
                    }
                >
                    Articles
                </NavLink>
                <NavLink
                    to="/tags"
                    className={({ isActive }) =>
                        cn(
                            "block px-2.5 py-1.5 rounded-md text-sm transition-colors",
                            isActive
                                ? "bg-secondary text-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        )
                    }
                >
                    Tags
                </NavLink>
                <NavLink
                    to="/books"
                    className={({ isActive }) =>
                        cn(
                            "block px-2.5 py-1.5 rounded-md text-sm transition-colors",
                            isActive
                                ? "bg-secondary text-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        )
                    }
                >
                    Books
                </NavLink>
            </aside>
            <main className="flex-1 p-8">
                <Routes>
                    <Route path="/" element={<Articles />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/articles/new" element={<ArticleForm />} />
                    <Route path="/articles/:id/edit" element={<ArticleForm />} />
                    <Route path="/tags" element={<Tags />} />
                    <Route path="/books" element={<Books />} />
                </Routes>
            </main>
        </div>
    )
}
