"use client"

import { getCurrentSeasonTags } from "@/app/lib/functions/season-functions"
import { Link } from "@chakra-ui/next-js"
import { Flex, Text } from "@chakra-ui/react"

import { usePathname } from "next/navigation"

export default function SeasonNav() {

    const pathname = usePathname()
    const activeSeasons = getCurrentSeasonTags()

    return (
        <Flex as="nav" id="goals-season-nav" justify="space-between" w="auto" gap="1rem">
            {activeSeasons.map(season => (
                <Link
                    key={`${season.seasonTag.season}-${season.seasonTag.year}`} 
                    id={`${season.seasonTag.season}-${season.seasonTag.year}-link`}
                    href={`/active-routine/goals/${season.seasonTag.season.toLowerCase()}-${season.seasonTag.year}`}
                    display="flex"
                    flexDir="column" 
                    w="25%" minW="75px" 
                    h="75px"
                    borderRadius="md"
                    opacity={pathname === `/active-routine/goals/${season.seasonTag.season.toLowerCase()}-${season.seasonTag.year}` ? "1" : "0.25"} 
                    bgColor="var(--purple-light)"
                    color="white"
                    alignItems="center" justifyContent="space-evenly"
                    _hover={{textDecor: "none", opacity: pathname === `/active-routine/goals/${season.seasonTag.season.toLowerCase()}-${season.seasonTag.year}` ? "1" : "0.4"}}
                    
                >
                        <Text>{season.seasonTag.season}</Text>
                        <Text>{season.emoji}</Text>
                        <Text>{season.seasonTag.year}</Text>                
                </Link>
            ))}
        </Flex>
    )
}