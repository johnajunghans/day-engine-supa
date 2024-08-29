import { Action } from "@/app/lib/interfaces/goals-interface";
import { createContext, Dispatch, FunctionComponent, ReactNode, useReducer } from "react";

interface ActionsContextProps {
    actionsState: Action[]
    actionsDispatch: Dispatch<{ type: "POST" | "PUT" | "DELETE", payload: Action }>
}

interface ActionsContextProviderProps {
    children: ReactNode
    initialValue: Action[]
}

export const ActionsContext = createContext<ActionsContextProps | null>(null)

const actionsReducer = (state: Action[], action: { type: "POST" | "PUT" | "DELETE", payload: Action }): Action[] => {
    switch (action.type) {
        default:
            return state
    }
}

export const ActionsContextProvider: FunctionComponent<ActionsContextProviderProps> = ({ children, initialValue }) => {

    const [actionsState, actionsDispatch] = useReducer(actionsReducer, initialValue)
    return (
        <ActionsContext.Provider value={{ actionsState, actionsDispatch }}>
            { children }
        </ActionsContext.Provider>
    )
}