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
import { RitualInstanceProvider } from "../context/db-context/ritual-instances-context"
import { ActionsContextProvider } from "../context/db-context/actions-context"
import Actions from "./actions/actions"

interface MainProps {
    rituals: Ritual[],
    ritualInstances: Record<DayOfWeek, RitualInstance[]>
    seasonalGoals: SeasonGoal[]
    monthlyGoals: MonthlyGoal[],
    actions: Action[]
}

type TabName = "Goals" | "Rituals" | "Actions"
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
                color={activeTab === name ? "white" : "black"}
                bgColor={activeTab === name ? theme.dark : "unset"} 
                _hover={activeTab !== name ? {border: `1px solid ${theme.dark}`} : {}} 
                borderColor="transparent"
                transition="box-shadow 100ms, border 100ms" 
                borderRadius="md"
                onClick={() => setActiveTab(name)}
            >{name}</Text>
        )    
    }

    return (
        <Box id='account-main-content-container' as='main' display="grid" gridTemplateColumns="1fr 3fr 6fr" p="1rem" gap="1rem" h="100vh" bgColor={theme.dark} overflow="hidden">
            <Navbar />
            <RitualsContextProvider initialValue={rituals}> 
                <ActionsContextProvider initialValue={actions}>
                    <Flex id="rituals-goals-container" height="calc(100vh - 2rem)" overflow="auto" overflowX="hidden" flexDir="column" width="100%" minW="400px" align="center" bgColor={theme.light} borderRadius="md" >
                        <Flex id="rituals-goals-tabs-container" h="60px" w="100%" align="center" justify="space-evenly">
                            <Tab name="Goals" />
                            <Tab name="Rituals" />
                            <Tab name="Actions" />
                        </Flex>
                        <SeasonalGoalsContextProvider initialState={seasonalGoals}>
                            <MonthlyGoalsContextProvider initialState={monthlyGoals}>
                                {activeTab === "Goals" ? <Goals /> 
                                    : activeTab === "Rituals" ? <Rituals />
                                    : <Actions />
                                }  
                            </MonthlyGoalsContextProvider>
                        </SeasonalGoalsContextProvider>
                    </Flex>
                    <Flex id="wheel-container" height="calc(100vh - 2rem)" bgColor={theme.light} borderRadius="md">
                        <RitualInstanceProvider initialValue={ritualInstances}>
                            <WheelMain />
                        </RitualInstanceProvider>   
                    </Flex>
                </ActionsContextProvider>
            </RitualsContextProvider>
        </Box>
    )
}

export default Main