import { AddIcon, ChevronRightIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react"
import { useThemeContext } from "../hooks/useThemeContext"
import { FunctionComponent, MouseEventHandler } from "react"
import Image from "next/image"

interface CreateNewBtnProps {
    position: string,
    onClick: MouseEventHandler<HTMLDivElement>
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

interface IconButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>
    expanded?: boolean
    label: string
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
            w="40px" h="40px"
            bg="rgba(255,255,255,0)"
            border="1px solid rgba(255,255,255,0.5)"
            _hover={{bg: "rgba(255,255,255,0.5)"}}
            aria-label={label}
            icon={<AddIcon boxSize={4} color="white" />}
            onClick={onClick}
        />
    )
}

interface RectBtnWithTextProps {
    onClick: MouseEventHandler<HTMLButtonElement>
    text?: string
    id: string
}

export const RectBtnWithText: React.FC<RectBtnWithTextProps> = ({ onClick, text, id }) => {

    return (
        <Button 
            id={id}
            onClick={onClick}
            className="RecBtnWithText-text-show"
            w="40px" h="40px"
            borderRadius="md"
            color="white"
            fontWeight="400"
            bgColor="rgba(255,255,255,0)"
            border="1px solid rgba(255,255,255,0.5)"
            _hover={{bgColor: "rgba(255,255,255,0.5)"}}
            transition="200ms"
        >
            <AddIcon boxSize={4} />
            {/* <Box as="span"
                w="0px"
                overflow="hidden"
                sx={{
                    '.RecBtnWithText-text-show:hover &': {
                      w: "100px",
                    },
                  }}
            >{text}</Box> */}
        </Button>
    )
}

interface ConfirmDeleteButtonProps {
    adjustedWidth: number,
    onClick: MouseEventHandler<HTMLButtonElement>
    isLoading: boolean
    confirmDelete: boolean
    text: string
}

export const ConfirmDeleteButton: FunctionComponent<ConfirmDeleteButtonProps> = ({ adjustedWidth, onClick, isLoading, text, confirmDelete }) => {
    
    return (
        <Button
            display="flex"
            gap="0.5rem"
            alignContent="center"
            justifyContent="center"
            id="delete-goal-button"
            w={confirmDelete ? `${adjustedWidth}px` : "40px"}
            transition="75ms"
            type="button" 
            colorScheme="red"
            onClick={onClick}
            isLoading={isLoading}
        >
            <DeleteIcon boxSize={4} />
            {confirmDelete && <Text>{text}</Text>}
        </Button>  
    )
}
    
    
