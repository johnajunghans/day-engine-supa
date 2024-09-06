'use client'

import { Action, MonthlyGoal, season, SeasonData } from "@/app/lib/interfaces/goals-interface";
import { Box, Flex, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { FunctionComponent, Suspense, useState } from "react";
import VisionTile from "./vision-tile";
import { getMonthEmoji, getMonthsGivenSeason, getZodiac, getZodiacRange } from "@/app/lib/functions/season-functions";
import MonthlyGoalTile from "./monthly-goal-tile";
import { AccentButton } from "@/app/components/buttons";


interface MonthlyGoalsProps {
    seasonData: SeasonData | null
    monthlyGoals: MonthlyGoal[] | null
    actions: Action[] | null
}

const Loader = () => <Flex align="center" justify="center"><Spinner size="lg" color="var(--de-orange)" /></Flex>
 
const MonthlyGoals: FunctionComponent<MonthlyGoalsProps> = ({ seasonData, monthlyGoals, actions }) => {

    const [seasonDataState, setSeasonDataState] = useState<SeasonData | null>(seasonData)
    const [monthlyGoalsState, setMonthlyGoalsState] = useState<MonthlyGoal[] | null>(monthlyGoals)
    const [actionsState, setActionsState] = useState<Action[] | null>(actions)

    const months = getMonthsGivenSeason(seasonData?.season as season)
    const currentMonth = getZodiac()

    return (
        <Suspense fallback={<Loader />}>
        <Box display="grid" gridTemplateRows="1fr 5fr" gap="1rem" minW="500px">
            <VisionTile
                variant="vision"
                title={`${seasonData?.season}-${seasonData?.year} Vision`} 
                indentWidth={160} 
                content={seasonDataState?.seasonal_vision} 
            />
            <Flex  borderRadius="md" flexDir="column" border="1px solid var(--de-orange-light)" overflow="hidden">
                <Tabs display="flex" flexDir="column" variant="unstyled" h="auto" align="center" gap="1.5rem" defaultIndex={months.indexOf(currentMonth)}>
                    <TabList justifyContent="space-evenly" mt="0.75rem">
                        {months.map(month => (
                            <Tab 
                                key={month}
                                // bgColor="var(--purple-light)"
                                opacity={0.25}
                                _hover={{ opacity: "0.4"}}
                                transition="100ms"
                                borderRadius="25px"
                                width="25%"
                                bgColor="var(--purple-light)"
                                _selected={{ opacity: 1 }}
                            >
                                <Flex gap="0.5rem" h="100%" align="center">
                                    <Text color="var(--white-main)" fontSize="18px">{month}</Text>
                                    <Text>{getMonthEmoji(month)}</Text>
                                </Flex>
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {monthlyGoalsState && months.map(month => (
                            <TabPanel key={month} display="flex" width="85%" flexDir="column" alignItems="flex-start" gap="1rem">
                                <Text display="flex" alignItems="center" border="1px solid var(--white-light)" fontSize="12px" letterSpacing="2px" borderRadius="5px" py="0.25rem" px="0.5rem" className=" antialiased" color="var(--white-80)">{`GOALS FOR MONTH OF ${month.toUpperCase()}: ${getZodiacRange(month).toUpperCase()}`}</Text>
                                {monthlyGoalsState.filter(goal => goal.month === month).map(goal => (
                                    <MonthlyGoalTile key={goal.id} goal={goal} actions={actionsState?.filter(action => action.monthly_goal_id === goal.id)} />
                                ))}
                                <AccentButton id="add-new-goal-button" name="Add Goal" onClick={() => {}} />
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Flex>
        </Box>
        </Suspense>
    );
}
 
export default MonthlyGoals;