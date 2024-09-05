import { Box, Text } from "@chakra-ui/react"
import { FunctionComponent } from "react"

interface VisionTileProps {
    title: string,
    content: string | undefined
    indentWidth: number
    variant: "vision" | "focus"
}

const VisionTile: FunctionComponent<VisionTileProps> = ({ title, content, indentWidth, variant }) => {

    return (
        <Box w="100%" 
            border={variant === "vision" ? "1px solid var(--de-orange)" : "unset"} 
            bgColor={variant === "focus" ? "var(--purple-light)" : "var(--purple-dark)"}
            borderRadius="md" 
            overflow="hidden" 
            pos="relative" 
            // p="0.25rem 0.5rem 0.5rem"
        >
            <Text 
                display="inline-block" 
                p="0.5rem"
                fontSize="16px" 
                borderBottomRightRadius="10px" 
                bgColor={variant === "vision" ? "var(--de-orange)" : "var(--white-main)"} 
                // pos="absolute" top={variant === "vision" ? "-3px" : "0px"} left={variant === "vision" ? "-3px" : "0px"}
            >{title}</Text>
            {/* <Box display="inline-block" w={`${indentWidth}px`}></Box> */}
            <Text 
                display="inline-block"
                px="0.5rem" 
                fontSize="16px" 
                className=" antialiased" 
                lineHeight="175%" 
                color="var(--white-main)"
            >{content}</Text>
        </Box>
    ) 
}

export default VisionTile