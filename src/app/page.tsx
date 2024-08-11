'use client'

import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useThemeContext } from "./hooks/useThemeContext";
import ThemeSelector from "./theme-selector";

export default function Home() {

  const theme = useThemeContext();

  return (
    <>
      <Flex id="home-page-header" as="header" bgColor={theme.theme.dark} h="64px">
        <ThemeSelector />
      </Flex>
      <Flex id="home-page-body" as="main" bgColor={theme.theme.light} minH="calc(100vh - 64px)">

      </Flex> 
    </>
  );
}
