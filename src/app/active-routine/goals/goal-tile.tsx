import { EditIconButton, ExpandIconButton } from "@/app/components/buttons";
import { Action, MonthlyGoal, SeasonGoal } from "@/app/lib/interfaces/goals-interface";
import { Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";

interface GoalTileProps {
    goal: SeasonGoal | MonthlyGoal
    months: string[] | null
    type: 'season' | 'month'
    actions: Action[]
    setEditDeleteModalData: Dispatch<SetStateAction<{initialGoal: SeasonGoal | MonthlyGoal, months: string[] | null} | null>>
}
 
const GoalTile: FunctionComponent<GoalTileProps> = ({ goal, months, type, actions, setEditDeleteModalData }) => {

    const [isExpanded, setIsExpanded] = useState(false)

    return ( 
        <Flex flexDir="column" align="center" width="100%" height={isExpanded ? "auto" : "50px"} bgColor="rgba(255,255,255,0.8)" border="1px solid white" borderRadius="md" >
            <Flex width="100%" h="50px" px="1rem" align="center" justify="space-between">
                <Text>{goal.summary}</Text>
                <Flex gap="0.5rem">
                    <EditIconButton 
                        label="open-update-delete-goal-modal" 
                        onClick={() => setEditDeleteModalData({initialGoal: goal, months: months ? months : null})} 
                    />
                    {actions.length > 0 && <ExpandIconButton label="show-goal-actions" onClick={() => setIsExpanded(!isExpanded)} expanded={isExpanded} />}
                </Flex> 
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