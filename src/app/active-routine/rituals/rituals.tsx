import { Ritual } from "@/app/lib/interfaces/rituals-interface";
import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import RitualTile from "./ritual-tile";
import { CreateNewBtn } from "@/app/components/buttons";
import ModalMain from "@/app/components/modal";
import CreateRitual from "./create-ritual-form";
import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";


interface Rituals {
    rituals: Ritual[]
}

const Rituals: React.FC<Rituals> = ({ rituals }) => {

    const { isOpen: isAddModalOpen, onClose: closeAddModal, onOpen: openAddModal } = useDisclosure()

    return ( 
        <Flex id="rituals-container"
            w="80%"
            pos="relative"
            flexGrow="1" 
            flexDir="column" 
            align="flex-start" 
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
            <IconButton 
                size="sm"
                bg="rgba(255,255,255,0.8)"
                border="1px solid white"
                _hover={{bg: "rgba(255,255,255,1)"}}
                aria-label="create ritual"
                icon={<AddIcon boxSize={4} />}
                onClick={openAddModal}
            />
            {/* <CreateNewBtn position="bottom-4 left-4" handleClick={openAddModal} /> */}
            <ModalMain isOpen={isAddModalOpen} onClose={closeAddModal} modalTitle="Create New Ritual">
                <CreateRitual />
            </ModalMain>
        </Flex>
     );
}
 
export default Rituals;