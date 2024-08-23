import { ExpandIconButton } from "@/app/components/buttons";
import { Action } from "@/app/lib/interfaces/goals-interface";
import { Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";

interface GoalTileProps {
    summary: string
    type: 'season' | 'month'
    actions: Action[]
}
 
const GoalTile: FunctionComponent<GoalTileProps> = ({ summary, type, actions }) => {

    const [isExpanded, setIsExpanded] = useState(false)

    console.log(type, actions)

    return ( 
        <Flex flexDir="column" align="center" width="100%" height={isExpanded ? "auto" : "50px"} bgColor="rgba(255,255,255,0.8)" border="1px solid white" borderRadius="md" >
            <Flex width="100%" h="50px" px="1rem" align="center" justify="space-between">
                <Text>{summary}</Text>
                {actions.length > 0 && <ExpandIconButton label="show-goal-actions" onClick={() => setIsExpanded(!isExpanded)} expanded={isExpanded} />}    
            </Flex>
            {isExpanded && <UnorderedList w="90%" mb="1rem">
                {actions.map(action => (
                    <ListItem key={action.id}>{action.summary}</ListItem>
                ))}
            </UnorderedList>}
        </Flex>
     );
}
 
export default GoalTile;