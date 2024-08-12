'use client'

import { Box } from "@chakra-ui/react"
import { useThemeContext } from "../hooks/useThemeContext"

export default function Main() {

    const { theme } = useThemeContext()

    return (
        <Box id='account-main-content-container' as='main' display="grid" gridTemplateColumns="1fr 3fr" minH="calc(100vh - 64px)" bgColor={theme.light} overflow="hidden">

        </Box>
    )
}