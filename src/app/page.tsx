'use client'

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useThemeContext } from "./hooks/useThemeContext";
import ThemeSelector from "./theme-selector";
import Link from "next/link";

export default function Home() {

  const theme = useThemeContext();

  const HomeWheel = ({ isLeft=true }) => {

    return (
        <svg className={`absolute ${isLeft ? "-bottom-80 -left-80" : "-top-80 -right-80"} animate-wheel-spin`} width="802" height="802" viewBox="0 0 802 802" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M801 401C801 621.914 621.914 801 401 801C180.086 801 1 621.914 1 401C1 180.086 180.086 1 401 1C621.914 1 801 180.086 801 401Z" fill="#F8F8FF" fillOpacity="0.33" stroke="black" strokeOpacity="0.5"/>
            <path d="M402.001 1V801" stroke="black" strokeOpacity="0.5"/>
            <path d="M298.283 14.4706L505.338 787.211" stroke="black" strokeOpacity="0.5"/>
            <path d="M201.433 54.35L601.433 747.17" stroke="black" strokeOpacity="0.5"/>
            <path d="M118.154 117.446L683.839 683.132" stroke="black" strokeOpacity="0.5"/>
            <path d="M54.85 200.567L747.67 600.567" stroke="black" strokeOpacity="0.5"/>
            <path d="M14.7294 297.317L787.47 504.372" stroke="black" strokeOpacity="0.5"/>
            <path d="M1 401.001H801" stroke="black" strokeOpacity="0.5"/>
            <path d="M14.4706 504.372L787.211 297.317" stroke="black" strokeOpacity="0.5"/>
            <path d="M54.35 600.567L747.17 200.567" stroke="black" strokeOpacity="0.5"/>
            <path d="M117.446 683.132L683.132 117.447" stroke="black" strokeOpacity="0.5"/>
            <path d="M200.567 747.17L600.567 54.35" stroke="black" strokeOpacity="0.5"/>
            <path d="M297.317 787.211L504.372 14.4705" stroke="black" strokeOpacity="0.5"/>
            <path d="M577 400.557C577 496.957 498.655 575.114 402 575.114C305.345 575.114 227 496.957 227 400.557C227 304.157 305.345 226 402 226C498.655 226 577 304.157 577 400.557Z" fill={theme.theme.light} stroke="black" strokeOpacity="0.5"/>
        </svg>
    )
  }

  return (
    <>
      <Flex id="home-page-header" as="header" bgColor={theme.theme.dark} h="64px" align="center" justify="space-between" px="1rem" gap="1rem">
        <Text as="h2" fontWeight="400" color="var(--de-orange)" className="antialiased">Day Engine</Text>
        <Flex id="login-btn-theme-selector-container" gap={"1rem"} align="center">
          <ThemeSelector />
          <Link href="/login"><Button variant="primary" w="100px" className="antialiased">Login</Button></Link>
        </Flex>
      </Flex>
      <Flex id="home-page-body" as="main" bgColor={theme.theme.light} minH="calc(100vh - 64px)" align="center" justify="center" pos="relative" overflow="hidden">
        <Image src="/logo.png" alt="logo-image" width={333} height={333} className="animate-logo-spin" />
        <HomeWheel />
        <HomeWheel isLeft={false} />
      </Flex> 
    </>
  );
}
