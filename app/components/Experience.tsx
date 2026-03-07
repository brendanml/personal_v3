import ExperienceSection from "~/components/ExperienceSection"
import { getExperiences } from "~/utils/db"
import { useTheme } from "~/lib/ThemeContext"

export default function Experience() {
    const { personaMode } = useTheme()
    const sections = getExperiences(personaMode)

    return (
        <div
            id="experience"
            className="col-span-12 @md:col-span-6 flex flex-col gap-8"
        >
            {sections.map((section) => (
                <ExperienceSection key={section.heading} section={section} />
            ))}
        </div>
    )
}
