import Tile from "@/app/components/tile";
import { MonthlyGoal } from "@/app/lib/interfaces/goals-interface";
import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface MonthlyGoalTileProps {
    goal: MonthlyGoal
}
 
const MonthlyGoalTile: FunctionComponent<MonthlyGoalTileProps> = ({ goal }) => {
    return (  
        <Tile
            id={`goal-${goal.id}`}
            title={goal.summary}
            onEditClick={() => {}}
        >
            <Flex>
                
            </Flex>
        </Tile>
    );
}
 
export default MonthlyGoalTile;