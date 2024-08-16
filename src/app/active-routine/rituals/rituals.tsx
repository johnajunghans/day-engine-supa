import { Ritual } from "@/app/lib/interfaces/rituals-interface";
import { Flex, useDisclosure } from "@chakra-ui/react";
import RitualTile from "./ritual-tile";
import { CreateNewBtn } from "@/app/components/buttons";
import ModalMain from "@/app/components/modal";
import CreateRitual from "./create-ritual";


interface Rituals {
    rituals: Ritual[]
}

const Rituals: React.FC<Rituals> = ({ rituals }) => {

    const { isOpen, onClose, onOpen } = useDisclosure()

    return ( 
        <Flex id="rituals-container"
            pos="relative"
            flexGrow="1" 
            flexDir="column" 
            align="center" 
            justify="flex-start" 
            gap="1rem" 
            py="1rem"
        >
            {rituals.map(ritual => (
                <RitualTile 
                    key={ritual.id}
                    id={ritual.id} 
                    name={ritual.name} 
                    description={ritual?.description} 
                />
            ))}
            <CreateNewBtn position="bottom-4 left-4" handleClick={onOpen} />
            <ModalMain isOpen={isOpen} onClose={onClose} modalTitle="Create New Ritual">
                <CreateRitual />
            </ModalMain>
        </Flex>
     );
}
 
export default Rituals;