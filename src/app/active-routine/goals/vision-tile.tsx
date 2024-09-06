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
            border={variant === "vision" ? "1px solid var(--de-orange-light)" : "unset"} 
            bgColor={variant === "focus" ? "var(--purple-light)" : "var(--purple-dark)"}
            borderRadius="md" 
            overflow="hidden" 
            pos="relative" 
        >
            <Text 
                display="inline-block" 
                p="0.5rem"
                fontSize="12px"
                letterSpacing="2px" 
                borderBottomRightRadius="10px" 
                borderBottom="1px solid var(--de-orange-light)"
                borderRight="1px solid var(--de-orange-light)"
                color="var(--de-orange)" 
                // pos="absolute" top={variant === "vision" ? "-3px" : "0px"} left={variant === "vision" ? "-3px" : "0px"}
            >{title.toUpperCase()}</Text>
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