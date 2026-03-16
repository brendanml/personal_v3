import ExperienceSection from "~/components/ExperienceSection"
import type { ExperienceSection as ExperienceSectionType } from "~/types"

export default function Experience({ sections }: { sections: ExperienceSectionType[] }) {
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
