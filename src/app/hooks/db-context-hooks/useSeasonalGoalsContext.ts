"use client"

import { useContext } from "react"
import { SeasonalGoalsContext } from '../../context/db-context/seasonal-goals-context'

export const useSeasonalGoalsContext = () => {
    const context = useContext(SeasonalGoalsContext);

    if(!context) {
        throw Error('Auth context may only be used inside of a component that is nested within the AuthContextProvider')
    }

    return context;
}