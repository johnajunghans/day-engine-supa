import { Action, MonthlyGoal, SeasonGoal } from "@/app/lib/interfaces/goals-interface";
import { Flex, Text } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, MouseEventHandler, ReactNode, SetStateAction } from "react";
import GoalTile from "./goal-tile";
import { AddIconButton, CreateNewBtn, RectBtnWithText } from "@/app/components/buttons";
import { getMonthsGivenSeason } from "@/app/lib/functions/season-functions";

interface SeasonalGoalsTileProps {
    seasonalGoals: SeasonGoal[]
    year: number,
    monthlyGoals: MonthlyGoal[]
    actions: Action[]
    setAddModalData: Dispatch<SetStateAction<{season: string, months: string[]} | null>>
}

interface MonthlyGoalContainerProps {
    children: ReactNode,
    label: string,
}
 
const SeasonalGoalsTile: FunctionComponent<SeasonalGoalsTileProps> = ({ monthlyGoals, seasonalGoals, year, actions, setAddModalData }) => {

    // IN FUTURE, SEASON VARIABLE SHOULD BE TAKEN FROM SOME LAYER OF CONTEXT
    const season = "Fall"
    const months = getMonthsGivenSeason(season)

    const MonthlyGoalContainer: FunctionComponent<MonthlyGoalContainerProps> = ({ label, children }) => {
        return (
            <Flex flexDir="column" justify="center" align="center" gap="0.5rem" borderRadius="md" w="100%" position="relative">
                <Text color="white" fontSize="12px" p="3px" position="absolute" top="-25px" left="0px">{label.toUpperCase()}</Text>
                { children }
            </Flex>
        )
    }

    return (
        <Flex id={`${season}-${year}-goals`} border="1px solid white" p="2rem 1rem 1rem" gap="1rem" mt="0.5rem" flexDir="column" borderRadius="md" w="100%" minH="100px" position="relative">
            <Text bgColor="white" borderRadius="5px" fontSize="14px" p="4px" position="absolute" top="-15px" left="-10px">{`${season}-${year}`}</Text>
            <Flex flexDir="column" gap="0.5rem">
                {seasonalGoals.length > 0 && seasonalGoals.map(goal => (
                    <GoalTile 
                        key={goal.id} 
                        summary={goal.summary} 
                        type="season" 
                        actions={actions.filter(action => action.seasonal_goal_id ? action.seasonal_goal_id === goal.id : false)} 
                    />
                ))}
            </Flex>
            {months.map(month => (
                <Flex key={month} flexDir="column" gap="1.5rem" px="1rem" mt="1rem">
                    <MonthlyGoalContainer label={month}>
                        {monthlyGoals.length > 0 && monthlyGoals.filter(goal => goal.month === month).map(goal => (
                            <GoalTile 
                                key={goal.id} 
                                summary={goal.summary} 
                                type="month" 
                                actions={actions.filter(action => action.monthly_goal_id ? action.monthly_goal_id === goal.id : false)} 
                            />
                        ))}
                    </MonthlyGoalContainer>
                </Flex>
            ))}
            {/* <RectBtnWithText id="add-goal-btn" text="Add Goal" onClick={() => setAddModalData({seasonalGoals: seasonalGoals, months: months})} /> */}
            <AddIconButton label="open-add-goal-modal" onClick={() => setAddModalData({season: season, months: months})} />
        </Flex>
     );
}
 
export default SeasonalGoalsTile;