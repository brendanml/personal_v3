import { useEffect, useState } from "react"
import { usePersona } from "~/lib/ThemeContext"
import type { Profile as ProfileType } from "~/types"

const Profile = ({ profile }: { profile: ProfileType | null }) => {
    const about = usePersona(profile?.about ?? { fun: "", technical: "" })
    const tag = usePersona(profile?.tag ?? { fun: "", technical: "" })
    const [sticky, setSticky] = useState(true)
    const [sections, setSections] = useState<{ id: string; label: string }[]>(
        [],
    )
    const [activeSection, setActiveSection] = useState<string | null>(null)

    useEffect(() => {
        const topSection = document.getElementById("top-section")
        const experience = document.getElementById("experience")
        if (!topSection || !experience) return

        // Sticky — release when top-section scrolls away
        const stickyObserver = new IntersectionObserver(
            ([entry]) => setSticky(entry.isIntersecting),
            { threshold: 0 },
        )
        stickyObserver.observe(topSection)

        // Section indicator — scroll listener with a detection line that
        // shifts from 30% → 70% of the viewport as you scroll through experience
        const sectionEls = Array.from(
            experience.querySelectorAll<HTMLElement>("[data-section-label]"),
        )

        setSections(
            sectionEls.map((el) => ({
                id: el.id,
                label: el.dataset.sectionLabel!,
            })),
        )

        const onScroll = () => {
            const expRect = experience.getBoundingClientRect()
            const vh = window.innerHeight
            const progress = Math.max(
                0,
                Math.min(1, -expRect.top / (expRect.height - vh)),
            )
            const activeLine = vh * (progress < 0.5 ? 0.3 : 0.7)

            let active: HTMLElement | null = null
            for (const el of sectionEls) {
                if (el.getBoundingClientRect().top <= activeLine) active = el
            }
            if (active) setActiveSection(active.dataset.sectionLabel!)
        }

        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })

        return () => {
            stickyObserver.disconnect()
            window.removeEventListener("scroll", onScroll)
        }
    }, [])

    return (
        <div
            className={`col-span-12 @md:col-span-6 @md:self-start flex flex-col gap-8 justify-between ${sticky ? "@md:sticky @md:top-28" : ""}`}
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl md:text-5xl font-secondary text-primary tracking-wide leading-tight">
                        Brendan Lynch
                    </h1>
                    <p className="text-md text-muted-foreground tracking-wide">
                        {tag}
                    </p>
                </div>

                <p className="text-base leading-relaxed text-foreground/80 max-w-prose">
                    {about}
                </p>
            </div>

            {sections.length > 0 && (
                <div className="hidden @md:flex flex-col gap-2">
                    {sections.map(({ id, label }) => {
                        const active = activeSection === label
                        return (
                            <a
                                key={id}
                                href={`#${id}`}
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                    e.preventDefault()
                                    document
                                        .getElementById(id)
                                        ?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        })
                                }}
                            >
                                <div
                                    className={`rounded-full shrink-0 transition-all duration-300 ${active ? "w-2 h-2 bg-pop border border-pop-text" : "w-1.5 h-1.5 bg-muted-foreground/30"}`}
                                />
                                <span
                                    className={`text-sm transition-all duration-300 ${!active && "hover:text-foreground"} ${active ? "text-pop-text" : "text-muted-foreground/40"}`}
                                >
                                    {label}
                                </span>
                            </a>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Profile
