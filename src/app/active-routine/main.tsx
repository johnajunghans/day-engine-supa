'use client'

import { Box, Flex, Text } from "@chakra-ui/react"
import { useThemeContext } from "../hooks/useThemeContext"
import Goals from "./goals/goals"
import Rituals from "./rituals/rituals"
import { FunctionComponent, useState } from "react"
import WheelMain from "./wheel/WheelMain"
import Navbar from "./navbar"
import { Ritual, RitualInstance, DayOfWeek } from "../lib/interfaces/rituals-interface"
import { Action, MonthlyGoal, SeasonGoal } from "../lib/interfaces/goals-interface"
import { SeasonalGoalsContextProvider } from "../context/db-context/seasonal-goals-context"
import { MonthlyGoalsContextProvider } from "../context/db-context/monthly-goals-context"
import { RitualsContextProvider } from "../context/db-context/rituals-context"

interface MainProps {
    rituals: Ritual[],
    ritualInstances: Record<DayOfWeek, RitualInstance[]>
    seasonalGoals: SeasonGoal[]
    monthlyGoals: MonthlyGoal[],
    actions: Action[]
}

type TabName = "Goals" | "Rituals"
interface TabProps {
    name: TabName
}

const Main: React.FC<MainProps> = ({ rituals, ritualInstances, seasonalGoals, monthlyGoals, actions }) => {

    const { theme } = useThemeContext()
    const [activeTab, setActiveTab] = useState<TabName>("Goals");

    const Tab: FunctionComponent<TabProps> = ({ name }) => {

        return (
            <Text as="button" 
                w="100px" h="40px"
                color="white"
                bgColor={theme.light} 
                boxShadow={activeTab === name ? "0px 4px 4px rgba(0,0,0,0.5)" : "unset"} 
                _hover={activeTab !== name ? {border: `1px solid ${theme.dark}`} : {}} 
                borderColor="transparent"
                transition="box-shadow 100ms, border 100ms" 
                borderRadius="md"
                onClick={() => setActiveTab(name)}
            >{name}</Text>
        )    
    }

    return (
        <Box id='account-main-content-container' as='main' display="grid" gridTemplateColumns="1fr 3fr 6fr" gap="1rem" minH="100vh" p="1rem" bgColor={theme.dark} overflow="hidden">
            <Navbar />
            <Flex id="rituals-goals-container" height="calc(100vh - 2rem)" overflow="auto" overflowX="hidden" flexDir="column" minW="400px"  align="center" bgColor={theme.light} border="1px solid var(--de-orange)" borderRadius="md">
                <Flex id="rituals-goals-tabs-container" h="60px" w="100%" align="center" justify="space-evenly" borderBottom="1px solid var(--de-orange)">
                    <Tab name="Goals" />
                    <Tab name="Rituals" />
                </Flex>
                <SeasonalGoalsContextProvider initialState={seasonalGoals}>
                    <MonthlyGoalsContextProvider initialState={monthlyGoals}>
                        <RitualsContextProvider initialValue={rituals}>
                            {activeTab === "Goals" ? <Goals actions={actions} /> : <Rituals />}
                        </RitualsContextProvider>
                    </MonthlyGoalsContextProvider>
                </SeasonalGoalsContextProvider>
            </Flex>
            <Flex id="wheel-container" bgColor={theme.light} border="1px solid var(--de-orange)" h="100%" px="1rem" borderRadius="md">
                <WheelMain ritualInstances={ritualInstances} rituals={rituals} />    
            </Flex>
        </Box>
    )
}

export default Main