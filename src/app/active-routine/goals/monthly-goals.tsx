'use client'

import { MonthlyGoal, season, SeasonData } from "@/app/lib/interfaces/goals-interface";
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import VisionTile from "./vision-tile";
import { getMonthEmoji, getMonthsGivenSeason, getZodiac } from "@/app/lib/functions/season-functions";
import MonthlyGoalTile from "./monthly-goal-tile";


interface MonthlyGoalsProps {
    seasonData: SeasonData | null
    monthlyGoals: MonthlyGoal[] | null
}
 
const MonthlyGoals: FunctionComponent<MonthlyGoalsProps> = ({ seasonData, monthlyGoals }) => {

    const [seasonDataState, setSeasonDataState] = useState<SeasonData | null>(seasonData)
    const [monthlyGoalsState, setMonthlyGoalsState] = useState<MonthlyGoal[] | null>(monthlyGoals)

    function MonthTabs() {
        const months = getMonthsGivenSeason(seasonData?.season as season)
        const currentMonth = getZodiac()
    
        return (
            <Tabs variant='unstyled' isFitted h="50px" align="center" gap="1rem" defaultIndex={months.indexOf(currentMonth)}>
                <TabList bgColor="var(--purple-dark)">
                    {months.map(month => (
                        <Tab 
                            key={month}
                            bgColor="var(--purple-light)"
                            opacity={0.25}
                            _hover={{ opacity: "0.4"}}
                            transition="100ms"
                            borderTopRadius="md"
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
                        <TabPanel key={month}>
                            {monthlyGoalsState.filter(goal => goal.month === month).map(goal => (
                                <MonthlyGoalTile key={goal.id} goal={goal} />
                            ))}
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        )
    }

    return (
        <Box display="grid" gridTemplateRows="1fr 5fr" gap="1rem" minW="500px">
            <VisionTile
                variant="focus"
                title={`${seasonData?.season}-${seasonData?.year} Vision`} 
                indentWidth={160} 
                content={seasonDataState?.seasonal_vision} 
            />
            <Flex bgColor="var(--purple-light)" borderRadius="md" flexDir="column">
                {<MonthTabs />}
                <Flex flexGrow={1}></Flex>
            </Flex>
        </Box> 
    );
}
 
export default MonthlyGoals;