"use client"

import { useContext } from "react"
import { RitualsContext } from '../../context/db-context/rituals-context'

export const useRitualsContext = () => {
    const context = useContext(RitualsContext);

    if(!context) {
        throw Error('Auth context may only be used inside of a component that is nested within the AuthContextProvider')
    }

    return context;
}