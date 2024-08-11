import { useThemeContext } from "@/app/hooks/useThemeContext";
import { useEffect, useState } from "react";
import useClose from "./hooks/useClose";

interface Theme {
    dark: string,
    light: string
}

interface GradientCircleProps {
    isAnimateSelector: boolean
}

export default function ThemeSelector({ isVertical=false }) {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, changeTheme } = useThemeContext();


    const themes = [
        {
            dark: "var(--blue-dark)",
            light: "var(--blue-light)"
        },
        {
            dark: "var(--green-dark)",
            light: "var(--green-light)"
        },
        {
            dark: "var(--purple-dark)",
            light: "var(--purple-light)"
        },
        {
            dark: "var(--red-dark)",
            light: "var(--red-light)"
        },
        {
            dark: "var(--dark-brown-dark)",
            light: "var(--dark-brown-light)"
        },
        {
            dark: "var(--light-brown-dark)",
            light: "var(--light-brown-light)"
        },
        {
            dark: "var(--grey-dark)",
            light: "var(--grey-light)"
        }
    ];

    function handleThemeChange(theme: Theme) {
        changeTheme(theme.dark, theme.light)
        setIsOpen(false);
    }

    useClose({id: "theme-picker-container", stateUpdateFunction: setIsOpen})

    return (
        <div id="theme-picker-container" className={
            isVertical ? `w-8 ${isOpen ? " h-[288px]" : "h-8"} flex flex-col items-center justify-evenly rounded-full bg-[var(--de-orange)] relative duration-200 overflow-hidden` 
            : `h-8 ${isOpen ? " w-[288px]" : "w-8"} flex items-center justify-center rounded-full bg-[var(--de-orange)] relative duration-200`}>
            {isOpen && themes.map( theme => (
                <svg key={theme.dark} role="button" width={32} height={32} onClick={() => handleThemeChange(theme)}>
                    <path d="M 16 6 L 16 26 A 10 10 1 0 1 16 6" fill={theme.dark} />
                    <path d="M 16 6 L 16 26 A 10 10 1 1 0 16 6" fill={theme.light} />
                </svg>
            ))}
            {isOpen && <div className={` border-t w-6 h-0 border-[#FFF] ${isVertical ? "" : "rotate-90"}`}></div>}
            <svg role="button" width={32} height={32} onClick={() => setIsOpen(!isOpen)}>
                <path d="M 16 6 L 16 26 A 10 10 1 0 1 16 6" fill={theme.dark} />
                <path d="M 16 6 L 16 26 A 10 10 1 1 0 16 6" fill={theme.light} />
            </svg>
        </div>
    )
}