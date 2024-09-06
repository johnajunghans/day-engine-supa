"use client"

import { Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import RitualTile from "./ritual-tile";
import ModalMain from "@/app/components/modal";
import CreateRitualForm from "./create-ritual-form";
import { useEffect, useState } from "react";
import EditDeleteRitualForm from "./edit-delete-ritual-form";
import { AccentButton, AddIconButton } from "@/app/components/buttons";
import { useRitualsContext } from "@/app/hooks/db-context-hooks/useRitualsContext";
import { Ritual } from "@/app/lib/interfaces/rituals-interface";
import { useThemeContext } from "@/app/hooks/useThemeContext";


interface Rituals {
    
}

const Rituals: React.FC<Rituals> = () => {

    const { ritualsState: rituals } = useRitualsContext()
    const { theme } = useThemeContext()

    const { isOpen: isAddModalOpen, onClose: closeAddModal, onOpen: openAddModal } = useDisclosure()
    const { isOpen: isEditModalOpen, onClose: closeEditModal, onOpen: openEditModal } = useDisclosure()

    // state that holds the value of the specific ritual being selected during edit or delete requests
    const [initialRitualEdit, setInitialRitualEdit] = useState<Ritual | null>(null);

    // opens the edit modal when the edit state changes
    useEffect(() => {
        if(initialRitualEdit) {
            openEditModal()
        }   
    }, [initialRitualEdit])

    function closeModalRegenState() {
        setInitialRitualEdit(null)
        closeEditModal();
    }

    return ( 
        <Flex id="rituals-container"
            border="1px solid var(--de-orange-light)"
            borderRadius="md"
            pos="relative"
            flexGrow="1" 
            flexDir="column" 
            align="flex-start" 
            justify="flex-start" 
            gap="1.5rem" 
            py="1rem"

        >
            <Flex id="rituals-header" as="header" align="center" justify="space-between" w="100%" px="1rem">
                <Text as="h2" color="var(--white-main)" fontSize="24px">Rituals</Text>
                <AccentButton id="add-new-ritual-button" name="Add Ritual" onClick={openAddModal} />
            </Flex>
            <Flex id="mapped-rituals-container" flexDir="column" gap="1rem" w="100%" align="center" justify="flex-start">
                {rituals.map(ritual => (
                    <RitualTile 
                        key={ritual.id}
                        ritual={ritual}
                        setInitialRitualEdit={setInitialRitualEdit}
                    />
                ))}
            </Flex>
            {/* <AddIconButton onClick={openAddModal} label="open-post-ritual-modal" /> */}
            <ModalMain isOpen={isAddModalOpen} onClose={closeAddModal} modalTitle="Create New Ritual">
                <CreateRitualForm closeModal={closeAddModal} />
            </ModalMain>
            <ModalMain isOpen={isEditModalOpen} onClose={closeModalRegenState} modalTitle={`Edit Ritual: ${initialRitualEdit?.name || ''}`}>
                {initialRitualEdit && <EditDeleteRitualForm closeModal={closeEditModal} initialRitual={initialRitualEdit} />}
            </ModalMain>
        </Flex>
     );
}
 
export default Rituals;