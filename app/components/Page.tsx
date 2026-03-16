import { contentColumnStyles } from "~/lib/styles"

const Page = ({ children }: { children: React.ReactNode }) => {
    return (
        <main
            className={`text-foreground mt-18 md:mt-20 ${contentColumnStyles} min-h-screen`}
        >
            <div className="@container grid grid-cols-12 w-full gap-6">
                {children}
            </div>
        </main>
    )
}

export default Page
