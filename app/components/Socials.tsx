import { useState, useEffect } from "react"
import GitHubIcon from "@mui/icons-material/GitHub"
import YouTubeIcon from "@mui/icons-material/YouTube"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import type { SvgIconComponent } from "@mui/icons-material"
import { Button } from "~/components/ui/button"
import { glassBaseStyles, glassStyles, glassInactiveStyles, glassClickable } from "~/lib/styles"
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
        { label: "LinkedIn", href: socials?.linkedin ?? "#", icon: LinkedInIcon },
    ]

    return (
        <FixedContentRow className="hidden md:flex bottom-4" innerClassName="justify-start">
            <div className={`${glassBaseStyles} ${scrolled ? glassStyles : glassInactiveStyles}`}>
                {links.map((item) => (
                    <Button key={item.label} variant="ghost" size="icon" asChild className={glassClickable}>
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
            </div>
        </FixedContentRow>
    )
}

export default Socials
