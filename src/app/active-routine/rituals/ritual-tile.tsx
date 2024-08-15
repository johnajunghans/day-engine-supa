import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

interface RitualTileProps {
    name: string,
    description?: string
}
 
const RitualTile: React.FC<RitualTileProps> = ({ name, description}) => {

    const [expanded, setExpanded] = useState(false)

    return ( 
        <Flex
            flexDir="column" 
            align="center"
            w="80%" 
            minW="200px" 
            h={expanded ? 'auto' : '50px'}
            minH="50px" 
            bg="var(--bg-main)"
            border={expanded ? "1px solid transparent" : "1px solid white"}
            borderRadius="md"
            boxShadow={expanded ? "0px 4px 4px rgba(0,0,0,0.4)" : "0px 0px 0px rgba(0,0,0,0.4)"}
            _hover={{boxShadow: "0px 4px 4px rgba(0,0,0,0.4)", borderColor: "transparent"}}
            transitionDuration="200ms"
            cursor="pointer"
            onClick={() => setExpanded(!expanded)}
        >
            <Flex
                w="full"
                h="50px"
                align="center" 
                justify="space-between" 
                px="1rem" 
                gap="1rem"
            >
                <Text 
                    color="black" 
                    fontSize="16px"
                >{name}</Text>
                <Flex >
                    <Image 
                        src="/chevron-right.svg" 
                        alt="chevron-right" 
                        width={24} 
                        height={24}
                        className={`${expanded ? "rotate-90" : "rotate-180"} duration-100`}
                    />
                </Flex>
            </Flex>
            {expanded && <Text>{description ? description : "This is a test description of a habit"}</Text>}
        </Flex>
     );
}
 
export default RitualTile;