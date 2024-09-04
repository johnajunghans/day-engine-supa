'use client'

import { MonthlyGoal, season, SeasonData } from "@/app/lib/interfaces/goals-interface";
import { Box, Flex, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { VisionTile } from "./vision-tile";
import { getMonthsGivenSeason } from "@/app/lib/functions/season-functions";


interface MonthlyGoalsProps {
    seasonData: SeasonData | null
    monthlyGoals: MonthlyGoal[] | null
}
 
const MonthlyGoals: FunctionComponent<MonthlyGoalsProps> = ({ seasonData, monthlyGoals}) => {

    function MonthTabs() {

        const months = getMonthsGivenSeason(seasonData?.season as season)
    
        return (
            <Tabs variant='unstyled' isFitted h="50px" align="center" gap="1rem" >
                <TabList bgColor="var(--purple-dark)">
                    {months.map(month => (
                        <Tab 
                            key={month}
                            bgColor="var(--purple-light)"
                            opacity={0.5}
                            color="var(--white-main)"
                            borderTopRadius="md"
                            _selected={{ opacity: 1 }}
                        >{month}</Tab>
                    ))}
                </TabList>
                <TabPanels>
                    <TabPanel>
                    
                    </TabPanel>
                    <TabPanel>
                    
                    </TabPanel>
                </TabPanels>
            </Tabs>
        )
    }

    const [seasonDataState, setSeasonDataState] = useState<SeasonData | null>(seasonData)
    const [monthlyGoalsState, setMonthlyGoalsState] = useState<MonthlyGoal[] | null>(monthlyGoals)

    return (
        <Box display="grid" gridTemplateRows="1fr 5fr" gap="1rem" minW="500px">
            <VisionTile
                variant="focus"
                title={`${seasonData?.season}-${seasonData?.year} Vision`} 
                indentWidth={100} 
                content={seasonDataState?.vision} />
            <Flex bgColor="var(--purple-light)" borderRadius="md" flexDir="column">
                <MonthTabs />
                <Flex flexGrow={1}></Flex>
            </Flex>
        </Box> 
    );
}
 
export default MonthlyGoals;