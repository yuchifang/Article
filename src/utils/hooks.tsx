import { useState, useEffect, useRef } from "react"

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



export function useOutsideAlert({ handleOutsideClick }: { handleOutsideClick: (value?: any) => void }): React.RefObject<HTMLDivElement> {

    const wrapper = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function OutsideClick(event: any) {
            //@ts-ignore
            if (wrapper && wrapper.current && !wrapper?.current?.contains(event.target)) {
                handleOutsideClick?.()
            }
        }

        document.addEventListener('mousedown', OutsideClick)
        return () => {
            document.removeEventListener('mousedown', OutsideClick)
        }
    }, [wrapper])

    return wrapper
}