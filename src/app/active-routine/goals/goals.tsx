import { Action, MonthlyGoal, SeasonGoal } from "@/app/lib/interfaces/goals-interface";
import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface GoalsProps {
    seasonalGoals: SeasonGoal[]
    monthlyGoals: MonthlyGoal[],
    actions: Action[]
}
 
const Goals: FunctionComponent<GoalsProps> = ({ seasonalGoals, monthlyGoals, actions }) => {
    
    return ( 
        <Flex id="goals-container">
            
        </Flex>
     );
}
 
export default Goals;