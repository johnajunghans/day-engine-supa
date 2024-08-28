import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import RitualTile from "./ritual-tile";
import ModalMain from "@/app/components/modal";
import CreateRitualForm from "./create-ritual-form";
import { useEffect, useState } from "react";
import EditDeleteRitualForm from "./edit-delete-ritual-form";
import { AddIconButton } from "@/app/components/buttons";
import { useRitualsContext } from "@/app/hooks/db-context-hooks/useRitualsContext";
import { Ritual } from "@/app/lib/interfaces/rituals-interface";


interface Rituals {
    
}

const Rituals: React.FC<Rituals> = () => {

    const { ritualsState: rituals } = useRitualsContext()

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
            w="80%"
            pos="relative"
            flexGrow="1" 
            flexDir="column" 
            align="flex-start" 
            justify="flex-start" 
            gap="0.5rem" 
            py="1rem"
        >
            {rituals.map(ritual => (
                <RitualTile 
                    key={ritual.id}
                    ritual={ritual}
                    setInitialRitualEdit={setInitialRitualEdit}
                />
            ))}
            <AddIconButton onClick={openAddModal} label="open-post-ritual-modal" />
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