import { contentColumnStyles } from "~/lib/styles"
import { navLinksFor } from "~/lib/navLinks"
import type { Profile, Socials } from "~/types"

const navLinks = navLinksFor("footer")

type FooterProps = {
    profile: (Profile & { socials: Socials }) | null
}

export default function Footer({ profile }: FooterProps) {
    const year = new Date().getFullYear()

    return (
        <footer className="w-full border-t border-border mt-16">
            <div className={`${contentColumnStyles} py-10 flex flex-col md:flex-row justify-between gap-8`}>
                <div className="flex flex-col gap-2">
                    <span className="font-semibold text-sm">{profile?.firstName} {profile?.lastName}</span>
                    <span className="text-sm text-muted-foreground">{profile?.location}</span>
                    <a href={`mailto:${profile?.socials?.email}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {profile?.socials?.email}
                    </a>
                </div>

                <nav className="flex flex-col gap-2">
                    <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Navigation</span>
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Social</span>
                    <a href={profile?.socials?.github} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
                    <a href={profile?.socials?.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
                    <a href={profile?.socials?.youtube} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">YouTube</a>
                </div>

                <div className="md:text-right text-sm text-muted-foreground self-end">
                    © {year} {profile?.firstName} {profile?.lastName}
                </div>
            </div>
        </footer>
    )
}
