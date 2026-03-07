import Profile from "~/components/Profile/Profile"
import Experience from "~/components/Experience"
import Page from "~/components/Page"
import Socials from "~/components/Socials"
import BooksPreview from "~/components/BooksPreview"
import ArticlesPreview from "~/components/ArticlesPreview"

export default function Home() {
    return (
        <Page>
            <div
                id="top-section"
                className="col-span-12 grid grid-cols-12 gap-4 @md:gap-16"
            >
                <Profile />
                <Experience />
            </div>
            <Socials />
        </Page>
    )
}
