import NavigationBar from "./Navigation"
import PersonaToggle from "./PersonaToggle"
import Footer from "./Footer"
import Flashlight from "~/components/Flashlight"

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <Flashlight>
                <div className="w-full max-w-7xl mx-auto flex flex-col">
                    <NavigationBar />
                    {/* <PersonaToggle /> */}
                    {children}
                    <Footer />
                </div>
            </Flashlight>
        </div>
    )
}

export default AppLayout
