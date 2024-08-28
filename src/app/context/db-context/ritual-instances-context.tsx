import { DayOfWeek, RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import { createContext, Dispatch, FunctionComponent, ReactNode, useReducer } from "react";

type RitualAction = {
    type: "POST" | "PUT" | "DELETE", 
    payload: RitualInstance
}

interface RitualInstanceContextProps {
    ritualInstanceState: Record<DayOfWeek, RitualInstance[]>
    ritualInstanceDispatch: Dispatch<RitualAction>
}

interface RitualInstanceProviderProps {
    children: ReactNode
    initialValue: Record<DayOfWeek, RitualInstance[]>
}

export const RitualInstanceContext = createContext<RitualInstanceContextProps | null>(null)

const ritualInstanceReducer = (state: Record<DayOfWeek, RitualInstance[]>, action: RitualAction): Record<DayOfWeek, RitualInstance[]> => {
    switch (action.type) {
        case 'POST':
            action.payload.days.forEach(day => state[day].push(action.payload))
            return state
        // case 'PUT':
        //     return state.map(item => item.id === action.payload.id ? { ...item, ...action.payload } : item)
        // case 'DELETE':
        //     return state.filter(item => item.id !== action.payload.id)
        default:
            return state
    }
}

export const RitualInstanceProvider: FunctionComponent<RitualInstanceProviderProps> = ({ children, initialValue }) => {

    const [ritualInstanceState, ritualInstanceDispatch] = useReducer(ritualInstanceReducer, initialValue)

    return (
        <RitualInstanceContext.Provider value={{ ritualInstanceState, ritualInstanceDispatch }}>
            { children }
        </RitualInstanceContext.Provider>
    )
}