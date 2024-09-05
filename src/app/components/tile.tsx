import { Divider, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, MouseEventHandler, ReactNode, useState } from "react";
import { EditIconButton, ExpandIconButton } from "./buttons";

interface TileProps {
    id: string
    children: ReactNode
    title: string
    onEditClick: MouseEventHandler<HTMLButtonElement>
}
 
const Tile: FunctionComponent<TileProps> = ({ id, children, title, onEditClick}) => {

    const [expanded, setExpanded] = useState(false)

    return (  
        <Flex id={id}
            flexDir="column" 
            align="center"
            w="85%" 
            minW="200px" 
            h={expanded ? 'auto' : '50px'}
            bg="var(--white-main)"
            // border={expanded ? "1px solid transparent" : "1px solid white"}
            borderRadius="md"
            // boxShadow={expanded ? "0px 4px 4px rgba(0,0,0,0.4)" : "0px 0px 0px rgba(0,0,0,0.4)"}
            transitionDuration="200ms"
        >
            <Flex id={`${id}-header`}
                w="full"
                h="50px"
                align="center" 
                justify="space-between" 
                pl="0.5rem"
                pr="0.25rem"  
            >
                <Text id={`${id}-title`}
                    color="black" 
                    fontSize="20px"
                >{title}</Text>
                <Flex 
                    align="center"
                    justify="center"
                >
                    <EditIconButton 
                        onClick={onEditClick} 
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
                    { children }
                </Flex>
            }
        </Flex>
    );
}
 
export default Tile;