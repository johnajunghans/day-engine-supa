"use client"

import { getCurrentSeasonTags } from "@/app/lib/functions/season-functions"
import { Flex, Text } from "@chakra-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SeasonNav() {

    const pathname = usePathname()
    const activeSeasons = getCurrentSeasonTags()

    return (
        <Flex as="nav" id="goals-season-nav" justify="space-between" w="100%">
            {activeSeasons.map(season => (
                <Link
                    key={`${season.seasonTag.season}-${season.seasonTag.year}`} 
                    id={`${season.seasonTag.season}-${season.seasonTag.year}-link`}
                    href={`/active-routine/goals/${season.seasonTag.season.toLowerCase()}-${season.seasonTag.year}`}
                >
                    <Flex 
                        flexDir="column" 
                        w="75px" h="75px" 
                        borderRadius="md"
                        opacity={pathname === `/active-routine/goals/${season.seasonTag.season.toLowerCase()}-${season.seasonTag.year}` ? "1" : "0.25"} 
                        bgColor="var(--purple-light)"
                        color="white"
                        align="center" justify="space-evenly"
                    >
                        <Text>{season.seasonTag.season}</Text>
                        <Text>{season.emoji}</Text>
                        <Text>{season.seasonTag.year}</Text>
                    </Flex>
                    
                </Link>
            ))}
        </Flex>
    )
}