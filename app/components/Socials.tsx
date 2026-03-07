import GitHubIcon from "@mui/icons-material/GitHub"
import YouTubeIcon from "@mui/icons-material/YouTube"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import type { SvgIconComponent } from "@mui/icons-material"
import { Button } from "~/components/ui/button"
import { glassStyles } from "~/lib/styles"
import FixedContentRow from "~/components/FixedContentRow"

type NavItem = { label: string; href: string; icon: SvgIconComponent }

const links: NavItem[] = [
    { label: "GitHub", href: "https://github.com", icon: GitHubIcon },
    { label: "YouTube", href: "https://youtube.com", icon: YouTubeIcon },
    { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
]

const Socials = () => (
    <FixedContentRow className="hidden md:flex bottom-4" innerClassName="justify-start">
        <div className={`pointer-events-auto flex items-center -mx-3 px-2 py-1 ${glassStyles}`}>
            {links.map((item) => (
                <Button key={item.label} variant="ghost" size="icon" asChild>
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

export default Socials
