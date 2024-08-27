"use client"

import { useContext } from "react"
import { MonthlyGoalsContext } from '../../context/db-context/monthly-goals-context'

export const useMonthlyGoalsContext = () => {
    const context = useContext(MonthlyGoalsContext);

    if(!context) {
        throw Error('Auth context may only be used inside of a component that is nested within the AuthContextProvider')
    }

    return context;
}