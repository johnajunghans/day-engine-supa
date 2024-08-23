import ModalMain from "@/app/components/modal";
import { ChevronRightIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import EditRitualForm from "./edit-ritual-form";
import DeleteRitualForm from "./delete-ritual-form";
import { DeleteIconButton, EditIconButton, ExpandIconButton } from "@/app/components/buttons";

interface Ritual {
    id: number,
    name: string,
    description?: string
}

interface RitualTileProps {
    id: number,
    name: string,
    description?: string,
    setInitialRitualEdit: Dispatch<SetStateAction<Ritual | null>>,
    setInitialRitualDelete: Dispatch<SetStateAction<Ritual | null>>
}
 
const RitualTile: React.FC<RitualTileProps> = ({ id, name, description, setInitialRitualEdit, setInitialRitualDelete}) => {

    const [expanded, setExpanded] = useState(false)
    // const { isOpen: isEditModalOpen, onClose: closeEditModal, onOpen: openEditModal } = useDisclosure()
    // const { isOpen: isDeleteModalOpen, onClose: closeDeleteModal, onOpen: openDeleteModal } = useDisclosure()

    function handleClickEdit() {
        setInitialRitualEdit({
            id, name, description
        })
    }

    function handleClickDelete() {
        setInitialRitualDelete({
            id, name, description
        })
    }

    return ( 
        <Flex id={`ritual-${id}-container`}
            flexDir="column" 
            align="center"
            w="100%" 
            minW="200px" 
            h={expanded ? 'auto' : '50px'}
            minH="50px" 
            bg="var(--bg-main)"
            border={expanded ? "1px solid transparent" : "1px solid white"}
            borderRadius="md"
            boxShadow={expanded ? "0px 4px 4px rgba(0,0,0,0.4)" : "0px 0px 0px rgba(0,0,0,0.4)"}
            // _hover={{boxShadow: "0px 4px 4px rgba(0,0,0,0.4)", borderColor: "transparent"}}
            transitionDuration="200ms"
        >
            <Flex id={`ritual-${id}-header`}
                w="full"
                h="50px"
                align="center" 
                justify="space-between" 
                px="0.5rem" 
            >
                <Text id={`ritual-${id}-name`}
                    color="black" 
                    fontSize="16px"
                >{name}</Text>
                <Flex 
                    align="center"
                    justify="center"
                    gap="0.5rem"
                >
                    <EditIconButton onClick={handleClickEdit} />
                    <DeleteIconButton onClick={handleClickDelete} />
                    {description && <ExpandIconButton onClick={() => setExpanded(!expanded)} expanded={expanded} />}
                </Flex>
            </Flex>
            {expanded && <Text id={`ritual-${id}-description`}>{description ? description : "This is a test description of a habit"}</Text>}
        </Flex>
     );
}
 
export default RitualTile;