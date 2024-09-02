"use client"

import React, { createContext, useState, ReactNode, useEffect } from "react";

interface Theme {
    dark: string;
    light: string;
}

interface ThemeContextProps {
    theme: Theme;
    changeTheme: (dark: string, light: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeContextProviderProps {
    children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {

    const changeTheme = (dark: string, light: string) => {
        setTheme({
            dark: dark,
            light: light,
        });
        localStorage.setItem("theme", JSON.stringify({dark: dark, light: light}))
    };
    
    let savedTheme: Theme | null

    if (typeof window !== "undefined") {
        // We're in the browser
        savedTheme = JSON.parse(localStorage.getItem("theme") ?? "null");
        // return savedTheme ? savedTheme : { dark: "var(--blue-dark)", light: "var(--blue-light)" };
    } else {
        // We're on the server, provide a default theme
        savedTheme = { dark: "var(--blue-dark)", light: "var(--blue-light)" };
    }
    
    const [theme, setTheme] = useState<Theme>(savedTheme ? savedTheme : { dark: "var(--blue-dark)", light: "var(--blue-light)" });

    // This useEffect runs only on the client side
    // useEffect(() => {
    //     const savedTheme = localStorage.getItem("theme");
    //     if (savedTheme) {
    //         console.log(savedTheme)
    //         setTheme(JSON.parse(savedTheme));
    //     }
    // }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
