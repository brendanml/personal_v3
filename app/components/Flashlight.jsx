import { useState, useEffect, useCallback } from "react"

function Flashlight({ children, radius = 200 }) {
    const [on, setOn] = useState(false)
    const [mouse, setMouse] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "e" || e.key === "E") setOn((o) => !o)
        }

        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    const onMove = useCallback((e) => {
        setMouse({ x: e.clientX, y: e.clientY })
    }, [])

    return (
        <div onMouseMove={onMove} style={{ position: "relative" }}>
            {children}
            {on && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        pointerEvents: "none",
                        zIndex: 9999,
                        background: `radial-gradient(circle ${radius}px at ${mouse.x}px ${mouse.y}px, transparent 0%, rgba(0,0,0,0.85) 100%)`,
                    }}
                />
            )}
        </div>
    )
}
export default Flashlight
