import { Flex, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { EditIconButton, ExpandIconButton } from "@/app/components/buttons";
import { Ritual } from "@/app/lib/interfaces/rituals-interface";

interface RitualTileProps {
    ritual: Ritual
    setInitialRitualEdit: Dispatch<SetStateAction<Ritual | null>>,
}
 
const RitualTile: React.FC<RitualTileProps> = ({ ritual, setInitialRitualEdit }) => {

    const [expanded, setExpanded] = useState(false)

    return ( 
        <Flex id={`ritual-${ritual.id}-container`}
            flexDir="column" 
            align="center"
            w="100%" 
            minW="200px" 
            h={expanded ? 'auto' : '40px'}
            bg="white"
            // border={expanded ? "1px solid transparent" : "1px solid white"}
            borderRadius="md"
            // boxShadow={expanded ? "0px 4px 4px rgba(0,0,0,0.4)" : "0px 0px 0px rgba(0,0,0,0.4)"}
            transitionDuration="200ms"
        >
            <Flex id={`ritual-${ritual.id}-header`}
                w="full"
                h="40px"
                align="center" 
                justify="space-between" 
                pl="0.5rem"
                pr="0.25rem"  
            >
                <Text id={`ritual-${ritual.id}-name`}
                    color="black" 
                    fontSize="16px"
                >{ritual.name}</Text>
                <Flex 
                    align="center"
                    justify="center"
                    gap="0.5rem"
                >
                    <EditIconButton 
                        onClick={() => setInitialRitualEdit(ritual)} 
                        label="open-update-ritual-modal" 
                    />
                    {ritual.description && 
                        <ExpandIconButton 
                            label="show-ritual-description" 
                            onClick={() => setExpanded(!expanded)} 
                            expanded={expanded} 
                        />
                    }
                </Flex>
            </Flex>
            {expanded && <Text id={`ritual-${ritual.id}-description`}>{ritual.description ? ritual.description : "This is a test description of a habit"}</Text>}
        </Flex>
     );
}
 
export default RitualTile;