import { Action, MonthlyGoal, SeasonGoal } from "@/app/lib/interfaces/goals-interface";
import { Flex, Text } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, MouseEventHandler, ReactNode, SetStateAction } from "react";
import GoalTile from "./goal-tile";
import { AddIconButton, CreateNewBtn, RectBtnWithText } from "@/app/components/buttons";

interface SeasonalGoalTileProps {
    seasonalGoal: SeasonGoal
    year: number,
    monthlyGoals: MonthlyGoal[]
    actions: Action[]
    setAddModalData: Dispatch<SetStateAction<{seasonalGoal: SeasonGoal, months: string[]} | null>>
}

interface MonthlyGoalContainerProps {
    children: ReactNode,
    label: string,
}
 
const SeasonalGoalTile: FunctionComponent<SeasonalGoalTileProps> = ({ monthlyGoals, seasonalGoal, year, actions, setAddModalData }) => {

    let months = [];

    if (seasonalGoal.season === 'Spring') {
        months = ["Aries", "Taurus", "Gemini"]
    } else if (seasonalGoal.season === 'Summer') {
        months = ["Cancer", "Leo", "Virgo"]
    } else if (seasonalGoal.season === 'Fall') {
        months = ["Libra", "Scorpio", "Sagittarius"]
    } else if (seasonalGoal.season === 'Winter') {
        months = ["Capricorn", "Aquarius", "Pisces"]
    } else {
        throw new Error("Season is not defined properly.")
    }

    const MonthlyGoalContainer: FunctionComponent<MonthlyGoalContainerProps> = ({ label, children }) => {
        return (
            <Flex flexDir="column" justify="center" align="center" gap="0.5rem" borderRadius="md" w="100%" position="relative">
                <Text color="white" fontSize="12px" p="3px" position="absolute" top="-25px" left="0px">{label.toUpperCase()}</Text>
                { children }
            </Flex>
        )
    }

    return (
        <Flex id={`seasonal-goal-${seasonalGoal.id}`} border="1px solid white" p="2rem 1rem 1rem" gap="1rem" mt="0.5rem" flexDir="column" borderRadius="md" w="100%" minH="100px" position="relative">
            <Text bgColor="white" borderRadius="5px" fontSize="14px" p="4px" position="absolute" top="-15px" left="-10px">{`${seasonalGoal.season.toUpperCase()}-${year}`}</Text>
            <GoalTile summary={seasonalGoal.summary} type="season" actions={actions.filter(action => action.seasonal_goal_id ? action.seasonal_goal_id === seasonalGoal.id : false)} />
            {months.map(month => (
                <Flex key={month} flexDir="column" gap="1.5rem" px="1rem" mt="1rem">
                    <MonthlyGoalContainer label={month}>
                        {monthlyGoals.filter(goal => goal.month === month).map(goal => (
                            <GoalTile key={goal.id} summary={goal.summary} type="month" actions={actions.filter(action => action.monthly_goal_id ? action.monthly_goal_id === goal.id : false)} />
                        ))}
                    </MonthlyGoalContainer>
                </Flex>
            ))}
            {/* <RectBtnWithText id="add-goal-btn" text="Add Goal" onClick={() => setAddModalData({seasonalGoal: seasonalGoal, months: months})} /> */}
            <AddIconButton label="open-add-goal-modal" onClick={() => setAddModalData({seasonalGoal: seasonalGoal, months: months})} />
        </Flex>
     );
}
 
export default SeasonalGoalTile;