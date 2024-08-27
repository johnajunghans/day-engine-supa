import { MonthlyGoal } from "@/app/lib/interfaces/goals-interface";
import { createContext, Dispatch, FunctionComponent, ReactNode, Reducer, useReducer } from "react";

interface MonthlyGoalsContextProps {
  monthlyGoalsState: MonthlyGoal[]
  monthlyGoalsDispatch: Dispatch<reducerAction>
}

interface MonthlyGoalsContextProviderProps {
  children: ReactNode;
  initialState: MonthlyGoal[]
}

type reducerAction = {
  type: string
  payload: MonthlyGoal
}

export const MonthlyGoalsContext = createContext<MonthlyGoalsContextProps | null>(null);

const goalsReducer = (state: MonthlyGoal[], action: reducerAction): MonthlyGoal[] => {
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

export const MonthlyGoalsContextProvider: FunctionComponent<MonthlyGoalsContextProviderProps> = ({ children, initialState }) => {
  
  const [monthlyGoalsState, monthlyGoalsDispatch] = useReducer(goalsReducer, initialState)

  return (
    <MonthlyGoalsContext.Provider value={{ monthlyGoalsState, monthlyGoalsDispatch }}>
      { children }
    </MonthlyGoalsContext.Provider>
  );
};