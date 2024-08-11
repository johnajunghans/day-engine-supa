'use client'

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useThemeContext } from "./hooks/useThemeContext";
import ThemeSelector from "./theme-selector";
import Link from "next/link";

export default function Home() {

  const theme = useThemeContext();

  return (
    <>
      <Flex id="home-page-header" as="header" bgColor={theme.theme.dark} h="64px" align="center" justify="space-between" px="1rem" gap="1rem">
        <Text as="h2" fontWeight="400" color="var(--de-orange)" className="antialiased">Day Engine</Text>
        <Flex id="login-btn-theme-selector-container" gap={"1rem"} align="center">
          <ThemeSelector />
          <Link href="/login"><Button variant="primary" w="100px" className="antialiased">Login</Button></Link>
        </Flex>
      </Flex>
      <Flex id="home-page-body" as="main" bgColor={theme.theme.light} minH="calc(100vh - 64px)">
        
      </Flex> 
    </>
  );
}
