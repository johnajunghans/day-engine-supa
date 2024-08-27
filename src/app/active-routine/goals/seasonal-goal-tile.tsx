import { Action, MonthlyGoal, SeasonGoal } from "@/app/lib/interfaces/goals-interface";
import { Flex, Text } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, MouseEventHandler, ReactNode, SetStateAction } from "react";
import GoalTile from "./goal-tile";
import { AddIconButton, CreateNewBtn, RectBtnWithText } from "@/app/components/buttons";
import { getMonthsGivenSeason } from "@/app/lib/functions/season-functions";
import { useSeasonalGoalsContext } from "@/app/hooks/db-context-hooks/useSeasonalGoalsContext";
import { useMonthlyGoalsContext } from "@/app/hooks/db-context-hooks/useMonthlyGoalsContext";

interface SeasonalGoalsTileProps {
    year: number,
    actions: Action[]
    setAddModalData: Dispatch<SetStateAction<{season: string, months: string[]} | null>>
    setEditDeleteModalData: Dispatch<SetStateAction<{initialGoal: SeasonGoal | MonthlyGoal, months: string[] | null} | null>>
}

interface MonthlyGoalContainerProps {
    label: string,
}
 
const SeasonalGoalsTile: FunctionComponent<SeasonalGoalsTileProps> = ({ year, actions, setAddModalData, setEditDeleteModalData }) => {

    // IN FUTURE, SEASON VARIABLE SHOULD BE TAKEN FROM SOME LAYER OF CONTEXT
    const season = "Fall"
    const months = getMonthsGivenSeason(season)

    const SeasonalGoalsContainer = () => {

        const { seasonalGoalsState } = useSeasonalGoalsContext()

        return (
            <Flex flexDir="column" gap="0.5rem">
                {seasonalGoalsState.length > 0 && seasonalGoalsState.map(goal => (
                    <GoalTile 
                        key={goal.id} 
                        goal={goal}
                        type="season" 
                        actions={actions.filter(action => action.seasonal_goal_id ? action.seasonal_goal_id === goal.id : false)} 
                        setEditDeleteModalData={setEditDeleteModalData}
                        months={null}
                    />
                ))}
            </Flex>
        ) 
    }

    const MonthlyGoalContainer: FunctionComponent<MonthlyGoalContainerProps> = ({ label }) => {

        const { monthlyGoalsState: monthlyGoals } = useMonthlyGoalsContext()

        return (
            <Flex flexDir="column" justify="center" align="center" gap="0.5rem" borderRadius="md" w="100%" position="relative">
                <Text color="white" fontSize="12px" p="3px" position="absolute" top="-25px" left="0px">{label.toUpperCase()}</Text>
                {monthlyGoals.length > 0 && monthlyGoals.filter(goal => goal.month === label).map(goal => (
                    <GoalTile 
                        key={goal.id} 
                        goal={goal}
                        type="month" 
                        actions={actions.filter(action => action.monthly_goal_id ? action.monthly_goal_id === goal.id : false)}
                        setEditDeleteModalData={setEditDeleteModalData}
                        months={months}
                    />
                ))}
            </Flex>
        )
    }

    return (
        <Flex id={`${season}-${year}-goals`} border="1px solid white" p="2rem 1rem 1rem" gap="1rem" mt="0.5rem" flexDir="column" borderRadius="md" w="100%" minH="100px" position="relative">
            <Text bgColor="white" borderRadius="5px" fontSize="14px" p="4px" position="absolute" top="-15px" left="-10px">{`${season.toUpperCase()}-${year}`}</Text>
            <SeasonalGoalsContainer />
            {months.map(month => (
                <Flex key={month} flexDir="column" gap="1.5rem" px="1rem" mt="1rem">
                    <MonthlyGoalContainer label={month} /> 
                </Flex>
            ))}
            {/* <RectBtnWithText id="add-goal-btn" text="Add Goal" onClick={() => setAddModalData({seasonalGoals: seasonalGoals, months: months})} /> */}
            <AddIconButton label="open-add-goal-modal" onClick={() => setAddModalData({season: season, months: months})} />
        </Flex>
     );
}
 
export default SeasonalGoalsTile;