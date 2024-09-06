import { Divider, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, MouseEventHandler, ReactNode, useState } from "react";
import { EditIconButton, ExpandIconButton } from "./buttons";

interface TileProps {
    id: string
    children: ReactNode
    title: string
    onEditClick: MouseEventHandler<HTMLButtonElement>
    width: number
}
 
const Tile: FunctionComponent<TileProps> = ({ id, children, title, onEditClick, width}) => {

    const [expanded, setExpanded] = useState(false)

    return (  
        <Flex id={id}
            flexDir="column" 
            w={`${width}%`} 
            minW="200px" 
            h={expanded ? 'auto' : '50px'}
            bg="rgba(255,255,255,0.1)"
            border="1px solid rgba(255,255,255,0.25)"
            borderRadius="md"
            color="var(--white-main)"
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
                <Flex flexDirection="column" gap="0.75rem" align="flex-start" justify="flex-start" p="0 1.5rem 1rem">
                    <Divider orientation="horizontal" />
                    { children }
                </Flex>
            }
        </Flex>
    );
}
 
export default Tile;