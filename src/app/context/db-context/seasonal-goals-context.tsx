import { MonthlyGoal, SeasonGoal } from "@/app/lib/interfaces/goals-interface";
import { createContext, Dispatch, FunctionComponent, ReactNode, Reducer, useReducer } from "react";

interface SeasonalGoalsContextProps {
  seasonalGoalsState: SeasonGoal[]
  seasonalGoalsDispatch: Dispatch<reducerAction>
}

interface SeasonalGoalsContextProviderProps {
  children: ReactNode;
  initialState: SeasonGoal[]
}

type reducerAction = {
  type: string
  payload: SeasonGoal
}

export const SeasonalGoalsContext = createContext<SeasonalGoalsContextProps | null>(null);

const goalsReducer = (state: SeasonGoal[], action: reducerAction): SeasonGoal[] => {
  switch (action.type) {
    case 'POST':
      return [...state, action.payload]
    default: 
      return state
  }
}

export const SeasonalGoalsContextProvider: FunctionComponent<SeasonalGoalsContextProviderProps> = ({ children, initialState }) => {
  
  const [seasonalGoalsState, seasonalGoalsDispatch] = useReducer(goalsReducer, initialState)

  return (
    <SeasonalGoalsContext.Provider value={{ seasonalGoalsState, seasonalGoalsDispatch }}>
      { children }
    </SeasonalGoalsContext.Provider>
  );
};