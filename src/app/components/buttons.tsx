import { AddIcon, ChevronRightIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Flex, IconButton } from "@chakra-ui/react"
import { useThemeContext } from "../hooks/useThemeContext"
import { MouseEventHandler } from "react"

interface CreateNewBtnProps {
    position: string,
    handleClick: React.MouseEventHandler<HTMLDivElement>
}

interface IconButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>
    expanded?: boolean
}

export const CreateNewBtn: React.FC<CreateNewBtnProps> = ({ position, handleClick }) => {
    const { theme } = useThemeContext();

    return (
        <Flex id="create-new-ritual-btn" 
            as="button" 
            w="64px" h="64px"
            pos="absolute"
            align="center"
            justify="center" 
            borderRadius="100%"
            bgColor={theme.dark}
            className={position}
            boxShadow="0px 4px 4px rgba(0,0,0,0.4)"
            onClick={handleClick}
        >
            <AddIcon boxSize={7} color="white" />
        </Flex>
    )
}

export const ExpandIconButton: React.FC<IconButtonProps> = ({ onClick, expanded }) => {

    return (
        <IconButton 
            aria-label="edit ritual"
            size="sm"
            onClick={onClick}
            icon={<ChevronRightIcon boxSize={6} className={`${expanded ? "rotate-90" : "rotate-180"} duration-100`} />}
            p="0px"
        />    
    )  
}

export const EditIconButton: React.FC<IconButtonProps> = ({ onClick }) => {
    return (
        <IconButton 
            aria-label="edit ritual"
            size="sm"
            onClick={onClick}
            icon={<EditIcon boxSize={4} />}
            p="0px"
        />
    )
}

export const DeleteIconButton: React.FC<IconButtonProps> = ({ onClick }) => {
    return (
        <IconButton 
            aria-label="edit ritual"
            size="sm"
            onClick={onClick}
            icon={<DeleteIcon boxSize={4} />}
            p="0px"
        />
    )
}
