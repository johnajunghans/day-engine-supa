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
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const newState = { ...state }
    switch (action.type) {

        case 'POST':
            action.payload.days.forEach(day => newState[day].push(action.payload))
            return newState

        case 'PUT':
            weekday.forEach(day => {
                const updatedArray = newState[day as DayOfWeek].map(item => {
                    if (item.id !== action.payload.id) return item
                    else if (action.payload.days.includes(day as DayOfWeek)) return action.payload
                    else return null
                }).filter(item => item !== null)
                newState[day as DayOfWeek] = updatedArray
            })
            console.log(newState)
            return newState

        case 'DELETE':
            action.payload.days.forEach(day => {
                newState[day].filter(item => action.payload.id !== item.id)
            })
            return newState

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