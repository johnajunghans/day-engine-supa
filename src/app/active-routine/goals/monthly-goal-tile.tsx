import { DeleteIconButton } from "@/app/components/buttons";
import Tile from "@/app/components/tile";
import { getSeasonalZodiacs } from "@/app/lib/functions/season-functions";
import { timeTo12Hr } from "@/app/lib/functions/util-functions";
import { Action, MonthlyGoal } from "@/app/lib/interfaces/goals-interface";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, css, Divider, Flex, IconButton, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, ReactNode, SetStateAction } from "react";

interface MonthlyGoalTileProps {
    goal: MonthlyGoal
    actions: Action[] | undefined
    onEditGoalClick: Dispatch<SetStateAction<MonthlyGoal | null>>
    onAddActionClick: Dispatch<SetStateAction<number | null>>
    onEditActionClick: Dispatch<SetStateAction<Action | null>>
}

interface DescriptionTileProps {
    title: string,
    content: string | undefined
    indentWidth: number
}

interface ActionProps {
    children: ReactNode
}

const DescriptionTile: FunctionComponent<DescriptionTileProps> = ({ title, content, indentWidth }) => {
    return (
        <Box w="100%" border="1px solid rgba(255,255,255,0.6)" borderRadius="md" overflow="hidden" pos="relative" p="0.5rem">
            <Text display="inline" letterSpacing="2px" p="7px" color="white" fontSize="12px" borderBottomRightRadius="10px" borderBottom="1px solid rgba(255,255,255,0.6)" borderRight="1px solid rgba(255,255,255,0.6)" pos="absolute" top="0px" left="0px">{title}</Text>
            <Box display="inline-block" w={`${indentWidth}px`} h="10px"></Box>
            <Text display="inline" float="inline-end" textAlign="left" fontSize="14px" style={{textAlign: "left"}}>{content}</Text>
        </Box>
    )
}
 
const MonthlyGoalTile: FunctionComponent<MonthlyGoalTileProps> = ({ goal, actions, onEditGoalClick, onAddActionClick, onEditActionClick }) => {

    const Actions: FunctionComponent<ActionProps> = ({ children }) => {
        return (
            <Flex id={`goal-${goal.id}-actions-container`} width="100%" flexDir="column" gap="0.5rem">
                <Box id={`goal-${goal.id}-actions-header`} display="grid" width="100%" gap="1rem" gridTemplateColumns="1fr 1fr">
                    <Flex borderBottom="1px solid var(--white-light)">
                        <Text display="flex" alignItems="center"  fontSize="12px" letterSpacing="2px" borderRadius="5px" py="0.25rem" px="0.5rem" color="white">ACTION</Text>
                    </Flex>
                    <Flex gap="0.5rem" justify="space-between" borderBottom="1px solid var(--white-light)">
                        <Text display="flex" alignItems="center"  fontSize="12px" letterSpacing="2px" borderRadius="5px" py="0.25rem" px="0.5rem" color="white">WHEN</Text> 
                    </Flex>
                </Box>
                <UnorderedList styleType="'➤'">
                   { children } 
                </UnorderedList>
                <Button onClick={() => onAddActionClick(goal.id)} bgColor="var(--de-orange)" width="100px" _hover={{bgColor: "var(--de-orange-80)"}} h="34px" fontWeight="400" px="0.5rem" mt="1rem">Add Action</Button>
            </Flex>
        )
    }

    return (  
        <Tile
            id={`goal-${goal.id}`}
            title={goal.summary}
            onEditClick={() => onEditGoalClick(goal)}
            width={100}
        > 
            <DescriptionTile title="WHY" content={goal.why} indentWidth={50} />
            <Actions>
                {actions && actions.map(action => (
                    <ListItem key={action.id} ml="0.5rem">
                        <Box id={`action-${action.id}-container`} className="my-box" display="grid" gridTemplateColumns="1fr 1fr" ml="0.5rem" _hover={{bgColor: "rgba(255,255,255,0.25)"}} transition="100ms" borderRadius="5px" p="3px" pos="relative">
                            <Text textAlign="left" ml="0.25rem">{action.summary}</Text>
                            {action.day && action.start_time && action.end_time && <Text textAlign="left">{`On ${action.day?.slice(0,3)} from ${timeTo12Hr(action.start_time)} to ${timeTo12Hr(action.end_time)}`}</Text>}
                            <Flex pos="absolute" right="5px" top="calc(50% - 12px)">
                                <IconButton 
                                    aria-label="edit-or-delete-action" 
                                    size="xs"
                                    opacity="0"
                                    sx={{
                                        '.my-box:hover &': {
                                          opacity: "1",
                                        },
                                      }}  
                                    _hover={{bgColor: "rgba(255,255,255,0.25)"}}
                                    width="24px" height="24px" 
                                    bgColor="unset" 
                                    icon={<EditIcon boxSize={3} color="white" />} 
                                    onClick={() => onEditActionClick(action)}    
                                />
                            </Flex>  
                        </Box>
                    </ListItem>
                ))}
            </Actions>
        </Tile>
    );
}
 
export default MonthlyGoalTile;