'use client'

import { EditIcon } from "@chakra-ui/icons"
import { Box, IconButton, Text } from "@chakra-ui/react"
import { Dispatch, FunctionComponent, SetStateAction } from "react"

interface VisionTileProps {
    title: string,
    content: string | undefined
    indentWidth: number
    variant: "vision" | "focus"
    onEditClick: Dispatch<SetStateAction<string | null>>
}

const VisionTile: FunctionComponent<VisionTileProps> = ({ title, content, indentWidth, variant, onEditClick }) => {
    
    return (
        <Box w="100%" 
            border={variant === "vision" ? "1px solid var(--de-orange-light)" : "unset"} 
            bgColor={variant === "focus" ? "var(--purple-light)" : "var(--purple-dark)"}
            borderRadius="md" 
            overflow="hidden" 
            pos="relative"
            className="my-box" 
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
            >{title.toUpperCase()}</Text>
            <IconButton 
                aria-label={`edit-${title}`}
                size="sm"
                pos="absolute" top="5px" right="5px"
                bgColor="unset"
                transform="translateX(10px)"
                opacity="0"
                sx={{
                    '.my-box:hover &': {
                      transform: "translateX(0px)", opacity: "1"
                    },
                  }}
                _hover={{ bgColor: "var(--white-bg)"}}
                icon={<EditIcon boxSize={4} color="var(--de-orange)" />}
                onClick={() => onEditClick(content ? content : null)}
            />
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