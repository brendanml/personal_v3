import { useState, useEffect } from "react"
import GitHubIcon from "@mui/icons-material/GitHub"
import YouTubeIcon from "@mui/icons-material/YouTube"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import EmailIcon from "@mui/icons-material/Email"
import type { SvgIconComponent } from "@mui/icons-material"
import { Button } from "~/components/ui/button"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "~/components/ui/popover"
import {
    glassBaseStyles,
    glassStyles,
    glassInactiveStyles,
    glassClickable,
} from "~/lib/styles"
import FixedContentRow from "~/components/FixedContentRow"
import type { Socials as SocialsType } from "~/types"

type NavItem = { label: string; href: string; icon: SvgIconComponent }

const Socials = ({ socials }: { socials?: SocialsType | null }) => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const links: NavItem[] = [
        { label: "GitHub", href: socials?.github ?? "#", icon: GitHubIcon },
        { label: "YouTube", href: socials?.youtube ?? "#", icon: YouTubeIcon },
        {
            label: "LinkedIn",
            href: socials?.linkedin ?? "#",
            icon: LinkedInIcon,
        },
    ]

    return (
        <FixedContentRow
            className="hidden md:flex bottom-4"
            innerClassName="justify-start"
        >
            <div
                className={`${glassBaseStyles} ${scrolled ? glassStyles : glassInactiveStyles}`}
            >
                {links.map((item) => (
                    <Button
                        key={item.label}
                        variant="ghost"
                        size="icon"
                        asChild
                        className={`${glassClickable} hover:cursor-pointer`}
                    >
                        <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.label}
                        >
                            <item.icon sx={{ fontSize: 26 }} />
                        </a>
                    </Button>
                ))}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`${glassClickable} hover:cursor-pointer`}
                            aria-label="Email"
                        >
                            <EmailIcon sx={{ fontSize: 26 }} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="top"
                        className="w-auto flex flex-col items-center gap-2"
                    >
                        <span className="text-sm text-muted-foreground">
                            {socials?.email}
                        </span>
                        <a
                            href={`mailto:${socials?.email}`}
                            className="text-sm font-medium hover:text-foreground transition-colors"
                        >
                            Send email
                        </a>
                    </PopoverContent>
                </Popover>
            </div>
        </FixedContentRow>
    )
}

export default Socials
