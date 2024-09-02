import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { EditIconButton, ExpandIconButton } from "@/app/components/buttons";
import { Ritual } from "@/app/lib/interfaces/rituals-interface";

interface RitualTileProps {
    ritual: Ritual
    setInitialRitualEdit: Dispatch<SetStateAction<Ritual | null>>,
}

interface DescriptionTileProps {
    title: string,
    content: string | undefined
    indentWidth: number
}
 
const RitualTile: React.FC<RitualTileProps> = ({ ritual, setInitialRitualEdit }) => {

    const [expanded, setExpanded] = useState(false)

    const DescriptionTile: FunctionComponent<DescriptionTileProps> = ({ title, content, indentWidth }) => {
        return (
            <Box w="100%" border="1px solid var(--light-grey)" borderRadius="md" overflow="hidden" pos="relative" p="0.5rem">
                <Text display="inline" px="5px" py="7px" fontSize="12px" borderBottomRightRadius="10px" bgColor="var(--light-grey)" pos="absolute" top="0px" left="0px">{title}</Text>
                <Box display="inline-block" w={`${indentWidth}px`}></Box>
                <Text display="inline" fontSize="14px">{content}</Text>
            </Box>
        )
    }

    return ( 
        <Flex id={`ritual-${ritual.id}-container`}
            flexDir="column" 
            align="center"
            w="85%" 
            minW="200px" 
            h={expanded ? 'auto' : '50px'}
            bg="white"
            // border={expanded ? "1px solid transparent" : "1px solid white"}
            borderRadius="md"
            // boxShadow={expanded ? "0px 4px 4px rgba(0,0,0,0.4)" : "0px 0px 0px rgba(0,0,0,0.4)"}
            transitionDuration="200ms"
        >
            <Flex id={`ritual-${ritual.id}-header`}
                w="full"
                h="50px"
                align="center" 
                justify="space-between" 
                pl="0.5rem"
                pr="0.25rem"  
            >
                <Text id={`ritual-${ritual.id}-name`}
                    color="black" 
                    fontSize="20px"
                >{ritual.name}</Text>
                <Flex 
                    align="center"
                    justify="center"
                >
                    <EditIconButton 
                        onClick={() => setInitialRitualEdit(ritual)} 
                        label="open-update-ritual-modal" 
                    /> 
                    <ExpandIconButton 
                        label="show-ritual-description" 
                        onClick={() => setExpanded(!expanded)} 
                        expanded={expanded} 
                    />
                </Flex>
            </Flex>
            {expanded &&
                <Flex flexDirection="column" gap="0.75rem" align="center" justify="flex-start" p="0 1.5rem 1rem">
                    <Divider orientation="horizontal" />
                    <DescriptionTile title="WHAT" content={ritual?.what} indentWidth={40} />
                    <DescriptionTile title="WHERE" content={ritual?.where} indentWidth={50} />
                    <DescriptionTile title="WHY" content={ritual?.why} indentWidth={35} />
                </Flex>
            }
        </Flex>
     );
}
 
export default RitualTile;