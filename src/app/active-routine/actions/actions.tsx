import { useActionsContext } from "@/app/hooks/db-context-hooks/useActionsContext";
import { Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface ActionsProps {
    
}
 
const Actions: FunctionComponent<ActionsProps> = () => {

    const { actionsState: actions } = useActionsContext()

    return ( 
        <Flex>
            <UnorderedList>
                {actions.map(action => (
                    <ListItem key={action.id}>{action.summary}</ListItem>
                ))}
            </UnorderedList>
        </Flex>
    );
}
 
export default Actions;