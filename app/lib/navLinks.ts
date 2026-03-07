export type NavComponent = "nav" | "footer"

export type NavLink = {
    label: string
    href: string
    shown: NavComponent[]
}

export const navLinks: NavLink[] = [
    { label: "Home", href: "/", shown: ["nav", "footer"] },
    { label: "Books", href: "/books", shown: ["nav", "footer"] },
    { label: "Articles", href: "/articles", shown: ["nav", "footer"] },
    { label: "Resume", href: "/resume", shown: ["nav", "footer"] },
]

export const navLinksFor = (component: NavComponent) =>
    navLinks.filter((l) => l.shown.includes(component))
