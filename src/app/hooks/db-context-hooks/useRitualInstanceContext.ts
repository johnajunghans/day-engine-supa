"use client"

import { useContext } from "react"
import { RitualInstanceContext } from '../../context/db-context/ritual-instances-context'

export const useRitualInstanceContext = () => {
    const context = useContext(RitualInstanceContext);

    if(!context) {
        throw Error('Auth context may only be used inside of a component that is nested within the AuthContextProvider')
    }

    return context;
}