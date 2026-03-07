import { contentColumnStyles } from "~/lib/styles"

const Page = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className={`text-foreground mt-18 md:mt-20 ${contentColumnStyles}`}>
            <div className="@container grid grid-cols-12 w-full">
                {children}
            </div>
        </main>
    )
}

export default Page
