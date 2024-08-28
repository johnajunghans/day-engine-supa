import { Ritual } from "@/app/lib/interfaces/rituals-interface";
import { createContext, Dispatch, FunctionComponent, ReactNode, useReducer } from "react";

interface RitualsContextProps {
    ritualsState: Ritual[]
    ritualsDispatch: Dispatch<{type: "POST" | "PUT" | "DELETE", payload: Ritual}>
}

interface RitualsProviderProps {
    children: ReactNode
    initialValue: Ritual[]
}

export const RitualsContext = createContext<RitualsContextProps | null>(null)

const ritualsReducer = (state: Ritual[], action: {type: string, payload: Ritual}): Ritual[] => {
    switch (action.type) {
        case 'POST':
            return [...state, action.payload]
        case 'PUT':
            return state.map(item => item.id === action.payload.id ? { ...item, ...action.payload } : item)
        case 'DELETE':
            return state.filter(item => item.id !== action.payload.id)
        default:
            return state
    }
}

export const RitualsContextProvider: FunctionComponent<RitualsProviderProps> = ({ children, initialValue}) => {

    const [ritualsState, ritualsDispatch] = useReducer(ritualsReducer, initialValue)

    return (
        <RitualsContext.Provider value={{ ritualsState, ritualsDispatch }}>
            { children }
        </RitualsContext.Provider>
    )
}