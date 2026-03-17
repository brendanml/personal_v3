import NavigationBar from "./Navigation"
import Footer from "./Footer"
import type { Profile, Socials } from "~/types"

type AppLayoutProps = {
    children: React.ReactNode
    profile: (Profile & { socials: Socials }) | null
}

const AppLayout = ({ children, profile }: AppLayoutProps) => {
    return (
        <div className="min-h-screen">
            <div className="w-full max-w-7xl mx-auto flex flex-col">
                <NavigationBar />
                {children}
                <Footer profile={profile} />
            </div>
        </div>
    )
}

export default AppLayout
