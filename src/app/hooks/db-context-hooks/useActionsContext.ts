"use client"

import { useContext } from "react"
import { ActionsContext } from '../../context/db-context/actions-context'

export const useActionsContext = () => {
    const context = useContext(ActionsContext);

    if(!context) {
        throw Error('Auth context may only be used inside of a component that is nested within the AuthContextProvider')
    }

    return context;
}