import { createContext, useContext, useLayoutEffect, useState } from "react"

type ColorMode = "light" | "dark"
type PersonaMode = "fun" | "technical"

interface ThemeContextValue {
    colorMode: ColorMode
    personaMode: PersonaMode
    toggleColorMode: () => void
    togglePersonaMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [colorMode, setColorMode] = useState<ColorMode>(() => {
        if (typeof window === "undefined") return "dark"
        return (localStorage.getItem("colorMode") as ColorMode) ?? "dark"
    })
    const [personaMode, setPersonaMode] = useState<PersonaMode>("technical")

    useLayoutEffect(() => {
        document.documentElement.classList.toggle("dark", colorMode === "dark")
        localStorage.setItem("colorMode", colorMode)
    }, [colorMode])

    const toggleColorMode = () =>
        setColorMode((prev) => (prev === "dark" ? "light" : "dark"))

    const togglePersonaMode = () =>
        setPersonaMode((prev) => (prev === "fun" ? "technical" : "fun"))

    return (
        <ThemeContext.Provider
            value={{
                colorMode,
                personaMode,
                toggleColorMode,
                togglePersonaMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
    return ctx
}

export function usePersona<T>(dual: { fun: T; technical: T }): T {
    const { personaMode } = useTheme()
    return dual[personaMode]
}
