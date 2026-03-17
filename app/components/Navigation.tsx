import { useState, useEffect } from "react"
import { useTheme } from "~/lib/ThemeContext"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import MenuIcon from "@mui/icons-material/Menu"
import { Button } from "~/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import { glassBaseStyles, glassStyles, glassInactiveStyles, glassClickable } from "~/lib/styles"
import FixedContentRow from "~/components/FixedContentRow"
import { navLinksFor, type NavLink } from "~/lib/navLinks"

const links = navLinksFor("nav")

const DesktopNav = ({ links }: { links: NavLink[] }) => {
    const { colorMode, toggleColorMode } = useTheme()
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <FixedContentRow
            className="hidden md:flex top-4"
            innerClassName="justify-end"
        >
            <div
                className={`${glassBaseStyles} ${scrolled ? glassStyles : glassInactiveStyles}`}
            >
                {links.map((link) => (
                    <Button
                        className={`[user-drag:none] ${glassClickable}`}
                        key={link.href}
                        variant="ghost"
                        asChild
                    >
                        <a
                            href={link.href}
                            draggable="false"
                            className="select-none"
                        >
                            {link.label}
                        </a>
                    </Button>
                ))}
                <Button
                    onClick={toggleColorMode}
                    aria-label="Toggle dark mode"
                    variant="ghost"
                    size="icon"
                    className={`cursor-pointer [user-drag:none] select-none ${glassClickable}`}
                >
                    {colorMode === "dark" ? (
                        <LightModeIcon fontSize="small" />
                    ) : (
                        <DarkModeIcon fontSize="small" />
                    )}
                </Button>
            </div>
        </FixedContentRow>
    )
}

const MobileNav = ({ links }: { links: NavLink[] }) => {
    const { colorMode, toggleColorMode } = useTheme()
    const [open, setOpen] = useState(false)

    return (
        <div className="flex md:hidden justify-end items-center gap-2 fixed p-2 top-0 right-0 bg-background w-full border-b border-b-accent z-50">
            <Button
                onClick={toggleColorMode}
                aria-label="Toggle dark mode"
                variant="ghost"
                size="icon"
                className="cursor-pointer"
            >
                {colorMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open menu">
                        <MenuIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <nav className="flex flex-col gap-2 mt-8">
                        {links.map((link) => (
                            <Button
                                key={link.href}
                                variant="ghost"
                                asChild
                                className="justify-start"
                            >
                                <a
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </a>
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}

const Navigation = () => {
    return (
        <nav>
            <DesktopNav links={links} />
            <MobileNav links={links} />
        </nav>
    )
}

export default Navigation
