import { Action, MonthlyGoal, SeasonGoal } from "@/app/lib/interfaces/goals-interface";
import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import SeasonalGoalTile from "./seasonal-goal-tile";

interface GoalsProps {
    seasonalGoals: SeasonGoal[]
    monthlyGoals: MonthlyGoal[],
    actions: Action[]
}
 
const Goals: FunctionComponent<GoalsProps> = ({ seasonalGoals, monthlyGoals, actions }) => {
    
    const year = new Date().getFullYear()

    return ( 
        <Flex id="goals-container" width="100%" p="1rem" flexDir="column" justify="center" align="center">
            {seasonalGoals && seasonalGoals.map(sGoal => (
                <SeasonalGoalTile
                    key={sGoal.id}
                    id={sGoal.id}
                    summary={sGoal.summary}
                    season={sGoal.season}
                    year={year}
                    monthlyGoals={monthlyGoals.filter(mGoal => mGoal.seasonal_goal_id === sGoal.id)} 
                />
            ))}
        </Flex>
     );
}
 
export default Goals;