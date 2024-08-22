import { MonthlyGoal } from "@/app/lib/interfaces/goals-interface";
import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";

interface SeasonalGoalTileProps {
    id: number,
    summary: string,
    season: string,
    year: number,
    monthlyGoals: MonthlyGoal[]
}

interface GoalContainerProps {
    children: ReactNode,
    label: string,
}

interface GoalTileProps {
    summary: string
}
 
const SeasonalGoalTile: FunctionComponent<SeasonalGoalTileProps> = ({ monthlyGoals, id, summary, season, year }) => {

    let months = [];

    if (season === 'Spring') {
        months = ["Aries", "Taurus", "Gemini"]
    } else if (season === 'Summer') {
        months = ["Cancer", "Leo", "Virgo"]
    } else if (season === 'Fall') {
        months = ["Libra", "Scorpio", "Sagittarius"]
    } else if (season === 'Winter') {
        months = ["Capricorn", "Aquarius", "Pisces"]
    } else {
        throw new Error("Season is not defined properly.")
    }

    const GoalContainer: FunctionComponent<GoalContainerProps> = ({ label, children }) => {
        return (
            <Flex border="1px solid white" flexDir="column" justify="center" align="center" borderRadius="md" w="100%" minH="100px" position="relative">
                <Text bgColor="white" borderRadius="5px" fontSize="12px" p="3px" position="absolute" top="-10px" left="-10px">{label}</Text>
                { children }
            </Flex>
        )
    }

    const GoalTile: FunctionComponent<GoalTileProps> = ({ summary }) => {
        return (
            <Flex width="90%" height="50px" bgColor="rgba(255,255,255,0.8)" border="1px solid white" borderRadius="md" px="1rem" justify="flex-start">
                <Text>{summary}</Text>
            </Flex>
        )
    }

    return ( 
        <Flex id={`seasonal-goal-${id}`} border="1px solid white" p="2rem 1rem 1rem" gap="1rem" flexDir="column" borderRadius="md" w="100%" minH="100px" position="relative">
            <Text bgColor="white" borderRadius="5px" fontSize="12px" p="3px" position="absolute" top="-10px" left="-10px">{`${season.toUpperCase()}-${year}`}</Text>
            <Flex width="100%" height="50px" bgColor="rgba(255,255,255,0.8)" border="1px solid white" borderRadius="md" px="1rem" justify="flex-start">
                <Text>{summary}</Text>
            </Flex>
            {months.map(month => (
                <GoalContainer label={month}>
                    {monthlyGoals.filter(goal => goal.month === month).map(goal => (
                        <GoalTile summary={goal.summary} />
                    ))}
                </GoalContainer>
            ))}
        </Flex>
     );
}
 
export default SeasonalGoalTile;