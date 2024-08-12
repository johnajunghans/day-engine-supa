'use client'

import { Box, Flex } from "@chakra-ui/react"
import { useThemeContext } from "../hooks/useThemeContext"
import Goals from "./goals/goals"
import Rituals from "./rituals/rituals"
import { useState } from "react"
import WheelMain from "./wheel/WheelMain"

export default function Main() {

    const { theme } = useThemeContext()
    const [showGoals, setShowGoals] = useState(true);

    return (
        <Box id='account-main-content-container' as='main' display="grid" gridTemplateColumns="1fr 3fr" minH="calc(100vh - 64px)" p="1rem" bgColor={theme.light} overflow="hidden">
            <Flex id="rituals-goals-container" bgColor={theme.dark} border="1px solid var(--de-orange)" h="100%" borderRadius="md">
                <Flex id="rituals-goals-tabs-container"></Flex>
                {showGoals ? <Goals /> : <Rituals />}
            </Flex>
            <Flex id="wheel-container" bgColor={theme.dark} border="1px solid var(--de-orange)" h="100%" borderRadius="md">
                <WheelMain />    
            </Flex>
        </Box>
    )
}