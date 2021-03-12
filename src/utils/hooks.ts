import { useState, useEffect } from "react"

export const useRWD = () => {
    const [device, setDevice] = useState("idle")

    useEffect(() => {
        const handleRWD = () => {
            if (window.innerWidth > 980) {
                setDevice("PC")
            } else {
                setDevice("Mobile")
            }
        }
        handleRWD()
        window.addEventListener('resize', handleRWD)
        return (() => {
            window.removeEventListener('resize', handleRWD)
        })
    }, [])



    return device
}