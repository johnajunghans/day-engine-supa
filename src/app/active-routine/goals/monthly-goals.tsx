'use client'

import { MonthlyGoal, SeasonData } from "@/app/lib/interfaces/goals-interface";
import { FunctionComponent } from "react";

interface MonthlyGoalsProps {
    seasonData: SeasonData | null
    monthlyGoals: MonthlyGoal[] | null
}
 
const MonthlyGoals: FunctionComponent<MonthlyGoalsProps> = ({ seasonData, monthlyGoals}) => {

    console.log(seasonData, monthlyGoals)

    return (  
        <></>
    );
}
 
export default MonthlyGoals;