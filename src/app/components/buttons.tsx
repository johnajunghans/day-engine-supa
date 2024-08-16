import { AddIcon } from "@chakra-ui/icons"
import { Flex } from "@chakra-ui/react"
import { useThemeContext } from "../hooks/useThemeContext"

interface CreateNewBtnProps {
    position: string,
    handleClick: React.MouseEventHandler<HTMLDivElement>
    
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