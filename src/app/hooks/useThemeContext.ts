"use client"

import { useContext } from "react"
import { ThemeContext } from '../context/themeContext'

export const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if(!context) {
        throw Error('Auth context may only be used inside of a component that is nested within the AuthContextProvider')
    }

    return context;
}