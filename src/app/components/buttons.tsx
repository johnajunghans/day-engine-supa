import { AddIcon, ChevronRightIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Flex, IconButton } from "@chakra-ui/react"
import { useThemeContext } from "../hooks/useThemeContext"
import { MouseEventHandler } from "react"
import Image from "next/image"

interface CreateNewBtnProps {
    position: string,
    onClick: React.MouseEventHandler<HTMLDivElement>
}

interface IconButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>
    expanded?: boolean
    label: string
}

export const CreateNewBtn: React.FC<CreateNewBtnProps> = ({ position, onClick }) => {

    return (
        <Flex  
            as="button" 
            w="64px" h="64px"
            pos="absolute"
            align="center"
            justify="center" 
            borderRadius="100%"
            bg="rgba(255,255,255,0.8)"
            border="1px solid white"
            _hover={{bg: "rgba(255,255,255,1)"}}
            className={position}
            onClick={onClick}
        >
            <Image src="/plus.svg" alt="add" width={40} height={40} />
        </Flex>
    )
}

export const ExpandIconButton: React.FC<IconButtonProps> = ({ onClick, expanded, label }) => {

    return (
        <IconButton 
            aria-label={label}
            size="sm"
            onClick={onClick}
            icon={<ChevronRightIcon boxSize={6} className={`${expanded ? "rotate-90" : "rotate-180"} duration-100`} />}
            p="0px"
        />    
    )  
}

export const EditIconButton: React.FC<IconButtonProps> = ({ onClick, label }) => {
    return (
        <IconButton 
            aria-label={label}
            size="sm"
            onClick={onClick}
            icon={<EditIcon boxSize={4} />}
            p="0px"
        />
    )
}

export const DeleteIconButton: React.FC<IconButtonProps> = ({ onClick, label }) => {
    return (
        <IconButton 
            aria-label={label}
            size="sm"
            onClick={onClick}
            icon={<DeleteIcon boxSize={4} />}
            p="0px"
        />
    )
}

export const AddIconButton: React.FC<IconButtonProps> = ({ onClick, label }) => {
    return (
        <IconButton
            w="32px"
            size="sm"
            bg="rgba(255,255,255,0.8)"
            border="1px solid white"
            _hover={{bg: "rgba(255,255,255,1)"}}
            aria-label={label}
            icon={<AddIcon boxSize={4} />}
            onClick={onClick}
        />
    )
}
