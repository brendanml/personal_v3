import { contentColumnStyles } from "~/lib/styles"

const FixedContentRow = ({
    children,
    className = "",
    innerClassName = "",
}: {
    children: React.ReactNode
    className?: string
    innerClassName?: string
}) => (
    <div
        className={`fixed left-0 right-0 z-50 pointer-events-none ${className}`}
    >
        <div
            className={`${contentColumnStyles} flex pointer-events-none ${innerClassName}`}
        >
            {children}
        </div>
    </div>
)

export default FixedContentRow
