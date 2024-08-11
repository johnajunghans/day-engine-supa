"use client"

import React, { createContext, useState, ReactNode } from "react";

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
    
    // nullish coalesing operator used to resolve the ts error
    const savedTheme = JSON.parse(localStorage.getItem("theme") ?? "null");
    // the null case is handled by first checking to see if savedTheme has a value and providing a default value in that event
    const [theme, setTheme] = useState<Theme>(savedTheme ? savedTheme : { dark: "var(--blue-dark)", light: "var(--blue-light)"});

    const changeTheme = (dark: string, light: string) => {
        setTheme({
            dark: dark,
            light: light,
        });
        localStorage.setItem("theme", JSON.stringify({dark: dark, light: light}))
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
