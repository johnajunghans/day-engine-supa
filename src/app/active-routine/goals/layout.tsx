import { useThemeContext } from "@/app/hooks/useThemeContext";
import { Box, Text } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";

interface GoalsLayoutProps {
    children: ReactNode
}

interface VisionTileProps {
    title: string,
    content: string | undefined
    indentWidth: number
    variant: "vision" | "focus"
}
 
const GoalsLayout: FunctionComponent<GoalsLayoutProps> = async ({ children }) => {

    const VisionTile: FunctionComponent<VisionTileProps> = ({ title, content, indentWidth, variant }) => {

        return (
            <Box w="100%" 
                border={variant === "vision" ? "1px solid var(--de-orange)" : "unset"} 
                bgColor={variant === "focus" ? "var(--purple-light)" : "unset"} 
                borderRadius="md" 
                overflow="hidden" 
                pos="relative" 
                p="0.5rem"
            >
                <Text 
                    display="inline" 
                    p="5px"
                    fontSize="16px" 
                    borderBottomRightRadius="10px" 
                    bgColor={variant === "vision" ? "var(--de-orange)" : "var(--white-main)"} 
                    pos="absolute" top={variant === "vision" ? "-3px" : "0px"} left={variant === "vision" ? "-3px" : "0px"}
                >{title}</Text>
                <Box display="inline-block" w={`${indentWidth}px`}></Box>
                <Text display="inline" fontSize="14px" color="var(--white-main)">{content}</Text>
            </Box>
        ) 
    }

    return ( 
        <Box id="goals-layout-outer-container" display="grid" gridTemplateRows="1fr 9fr" gap="1rem">
            <Box id="vision-and-yearly-container" display="grid" gridTemplateColumns="1fr 1fr" gap="1rem">
                <VisionTile title="VISION" content="alksjdflajsdflja" indentWidth={60} variant="vision" />
                <VisionTile title="Focus - 2024" content="alksjdflajsdflja" indentWidth={100} variant="focus" />
            </Box>
        </Box>
    );
}
 
export default GoalsLayout;