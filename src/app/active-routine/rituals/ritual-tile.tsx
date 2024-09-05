import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { EditIconButton, ExpandIconButton } from "@/app/components/buttons";
import { Ritual } from "@/app/lib/interfaces/rituals-interface";
import Tile from "@/app/components/tile";

interface RitualTileProps {
    ritual: Ritual
    setInitialRitualEdit: Dispatch<SetStateAction<Ritual | null>>,
}

interface DescriptionTileProps {
    title: string,
    content: string | undefined
    indentWidth: number
}
 
const RitualTile: React.FC<RitualTileProps> = ({ ritual, setInitialRitualEdit }) => {

    const DescriptionTile: FunctionComponent<DescriptionTileProps> = ({ title, content, indentWidth }) => {
        return (
            <Box w="100%" border="1px solid var(--light-grey)" borderRadius="md" overflow="hidden" pos="relative" p="0.5rem">
                <Text display="inline" px="5px" py="7px" fontSize="12px" borderBottomRightRadius="10px" bgColor="var(--light-grey)" pos="absolute" top="0px" left="0px">{title}</Text>
                <Box display="inline-block" w={`${indentWidth}px`}></Box>
                <Text display="inline" fontSize="14px">{content}</Text>
            </Box>
        )
    }

    return (
        <Tile
            id={`ritual-${ritual.id}`}
            onEditClick={() => setInitialRitualEdit(ritual)}
            title={ritual.name}
        >
            <DescriptionTile title="WHAT" content={ritual?.what} indentWidth={40} />
            <DescriptionTile title="WHERE" content={ritual?.where} indentWidth={50} />
            <DescriptionTile title="WHY" content={ritual?.why} indentWidth={35} />
        </Tile>

            
     );
}
 
export default RitualTile;