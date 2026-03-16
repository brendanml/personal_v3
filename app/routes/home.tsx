import { useLoaderData } from "react-router"
import type { Route } from "./+types/home"
import { getProfile, getExperiences } from "~/utils/data.server"
import Profile from "~/components/Profile/Profile"
import Experience from "~/components/Experience"
import Page from "~/components/Page"
import Socials from "~/components/Socials"

export async function loader(_: Route.LoaderArgs) {
    const [profile, experiences] = await Promise.all([
        getProfile(),
        getExperiences(),
    ])
    return { profile, experiences }
}

export default function Home() {
    const { profile, experiences } = useLoaderData<typeof loader>()
    return (
        <Page>
            <div
                id="top-section"
                className="col-span-12 grid grid-cols-12 gap-4 @md:gap-16"
            >
                <Profile profile={profile} />
                <Experience sections={experiences} />
            </div>
            <Socials socials={profile?.socials} />
        </Page>
    )
}
