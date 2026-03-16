import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined"
import DataObjectOutlinedIcon from "@mui/icons-material/DataObjectOutlined"
import { useTheme } from "~/lib/ThemeContext"
import { glassStyles } from "~/lib/styles"
import FixedContentRow from "~/components/FixedContentRow"

const PersonaToggle = () => {
    const { personaMode, togglePersonaMode } = useTheme()
    const isFun = personaMode === "fun"

    return (
        <FixedContentRow
            className="hidden md:flex top-4"
            innerClassName="justify-start"
        >
            <button
                onClick={togglePersonaMode}
                aria-label={`Switch to ${isFun ? "technical" : "fun"} mode`}
                className={`pointer-events-auto flex items-center gap-2 px-3 py-1.5 cursor-pointer text-sm font-medium transition-[background-color,border-color,box-shadow,backdrop-filter] duration-150 ${glassStyles}`}
            >
                {isFun ? (
                    <EmojiEmotionsOutlinedIcon fontSize="small" />
                ) : (
                    <DataObjectOutlinedIcon fontSize="small" />
                )}
                {isFun ? "fun" : "technical"}
            </button>
        </FixedContentRow>
    )
}

export default PersonaToggle
