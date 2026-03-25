import { contentColumnStyles } from "~/lib/styles"
import type { Profile, Socials } from "~/types"

type FooterProps = {
    profile: (Profile & { socials: Socials }) | null
}

export default function Footer({ profile }: FooterProps) {
    const year = new Date().getFullYear()

    return (
        <footer className="w-full border-t border-border mt-16">
            <div
                className={`${contentColumnStyles} py-6 flex justify-between items-center`}
            >
                <span className="text-sm font-semibold"></span>
                <span className="text-sm text-muted-foreground">
                    © {year} {profile?.firstName} {profile?.lastName}
                </span>
            </div>
        </footer>
    )
}
