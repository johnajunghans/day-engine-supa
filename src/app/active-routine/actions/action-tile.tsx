import { EditIconButton, ExpandIconButton } from "@/app/components/buttons";
import { Action } from "@/app/lib/interfaces/goals-interface";
import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";

interface ActionTileProps {
    action: Action
}
 
const ActionTile: FunctionComponent<ActionTileProps> = ({ action }) => {

    const [isExpanded, setIsExpanded] = useState(false)

    return (  
        <Flex flexDir="column" align="center" width="100%" height={isExpanded ? "auto" : "40px"} bgColor="rgba(255,255,255,0.8)" border="1px solid white" borderRadius="md" >
            <Flex width="100%" h="40px" pl="0.5rem" pr="0.25rem" align="center" justify="space-between">
                <Text>{action.summary}</Text>
                <Flex align="center">
                    <EditIconButton 
                        label="open-update-delete-goal-modal" 
                        onClick={() => {}} 
                    />
                </Flex> 
            </Flex>
        </Flex>
    );
}
 
export default ActionTile;