import { Ritual } from "@/app/lib/interfaces/rituals-interface";
import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import RitualTile from "./ritual-tile";
import ModalMain from "@/app/components/modal";
import CreateRitual from "./create-ritual-form";
import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import EditRitualForm from "./edit-ritual-form";
import DeleteRitualForm from "./delete-ritual-form";


interface Rituals {
    rituals: Ritual[]
}

interface InitialRitual {
    id: number,
    name: string,
    description?: string
}

const Rituals: React.FC<Rituals> = ({ rituals }) => {

    const { isOpen: isAddModalOpen, onClose: closeAddModal, onOpen: openAddModal } = useDisclosure()
    const { isOpen: isEditModalOpen, onClose: closeEditModal, onOpen: openEditModal } = useDisclosure()
    const { isOpen: isDeleteModalOpen, onClose: closeDeleteModal, onOpen: openDeleteModal } = useDisclosure()

    // state that holds the value of the specific ritual being selected during edit or delete requests
    const [initialRitualEdit, setInitialRitualEdit] = useState<InitialRitual | null>(null);
    const [initialRitualDelete, setInitialRitualDelete] = useState<InitialRitual | null>(null);

    // opens the edit modal when the edit state changes
    useEffect(() => {
        if(initialRitualEdit) {
            openEditModal()
        }   
    }, [initialRitualEdit])

    // opens the delete modal when the delete state changes
    useEffect(() => {
        if (initialRitualDelete) {
           openDeleteModal() 
        }
    }, [initialRitualDelete])

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
                    id={ritual.id ?? 0} 
                    name={ritual.name} 
                    description={ritual?.description ?? ''}
                    setInitialRitualEdit={setInitialRitualEdit}
                    setInitialRitualDelete={setInitialRitualDelete}
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
            <ModalMain isOpen={isAddModalOpen} onClose={closeAddModal} modalTitle="Create New Ritual">
                <CreateRitual />
            </ModalMain>
            <ModalMain isOpen={isEditModalOpen} onClose={closeEditModal} modalTitle={`Edit Ritual: ${initialRitualEdit?.name || ''}`}>
                {initialRitualEdit && <EditRitualForm initialRitual={initialRitualEdit} />}
            </ModalMain>
            <ModalMain isOpen={isDeleteModalOpen} onClose={closeDeleteModal} modalTitle={`Delete Ritual: ${initialRitualDelete?.name || ''}`}>
                {initialRitualDelete && <DeleteRitualForm id={initialRitualDelete?.id} />}
            </ModalMain>
        </Flex>
     );
}
 
export default Rituals;