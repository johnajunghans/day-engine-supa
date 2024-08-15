'use client'

import { Box, Flex, Text } from "@chakra-ui/react"
import { useThemeContext } from "../hooks/useThemeContext"
import Goals from "./goals/goals"
import Rituals from "./rituals/rituals"
import { useState } from "react"
import WheelMain from "./wheel/WheelMain"
import Navbar from "./navbar"
import { Ritual, RitualInstance } from "../lib/interfaces/rituals-interface"

interface MainProps {
    rituals: Ritual[],
    ritualInstances: RitualInstance[]
}

const Main: React.FC<MainProps> = ({ rituals, ritualInstances }) => {

    const { theme } = useThemeContext()
    const [showGoals, setShowGoals] = useState(false);

    return (
        <Box id='account-main-content-container' as='main' display="grid" gridTemplateColumns="1fr 3fr 6fr" gap="1rem" minH="100vh" p="1rem" bgColor={theme.dark} overflow="hidden">
            <Navbar />
            <Flex id="rituals-goals-container" flexDir="column" bgColor={theme.light} border="1px solid var(--de-orange)" h="100%" borderRadius="md">
                <Flex id="rituals-goals-tabs-container" h="60px" w="100%" align="center" justify="space-evenly" borderBottom="1px solid var(--de-orange)">
                    <Text as="button" 
                        w="100px" h="40px" 
                        boxShadow={showGoals ? "0px 4px 4px rgba(0,0,0,0.5)" : "unset"} 
                        _hover={!showGoals ? {border: `1px solid ${theme.dark}`} : {}} 
                        borderColor="transparent"
                        transitionDuration="200ms" 
                        borderRadius="md"
                        onClick={() => setShowGoals(true)}
                    >Goals</Text>
                    <Text as="button" 
                        w="100px" h="40px" 
                        boxShadow={!showGoals ? "0px 4px 4px rgba(0,0,0,0.4)" : "unset"}
                        borderColor="transparent"
                        _hover={showGoals ? {border: `1px solid ${theme.dark}`} : {}}
                        transitionDuration="200ms"
                        borderRadius="md"
                        onClick={() => setShowGoals(false)}
                    >Rituals</Text>
                        
                </Flex>
                {showGoals ? <Goals /> : <Rituals rituals={rituals} />}
            </Flex>
            <Flex id="wheel-container" bgColor={theme.light} border="1px solid var(--de-orange)" h="100%" px="1rem" borderRadius="md">
                <WheelMain />    
            </Flex>
        </Box>
    )
}

export default Main