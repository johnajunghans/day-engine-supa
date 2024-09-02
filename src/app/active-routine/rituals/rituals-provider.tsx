'use client'

import { MappableInstances, Ritual } from "@/app/lib/interfaces/rituals-interface";
import { FunctionComponent, ReactNode } from "react";
import { RitualsContextProvider } from "@/app/context/db-context/rituals-context";
import { RitualInstanceProvider } from "@/app/context/db-context/ritual-instances-context";
import RitualsContainer from './rituals'
import WheelMain from "../wheel/WheelMain";
import { Box } from "@chakra-ui/react";

interface RitualsProviderProps {
    rituals: Ritual[]
    ritualInstances: MappableInstances
}
 
const RitualsProvider: FunctionComponent<RitualsProviderProps> = ({ rituals, ritualInstances }) => {
    return ( 
        <RitualsContextProvider initialValue={rituals}>
            <RitualInstanceProvider initialValue={ritualInstances}>

                <Box h="calc(100vh - 2rem)" display="grid" gridTemplateColumns="1fr 2fr" gap="1rem">
                    <RitualsContainer />
                    <WheelMain />
                </Box>

            </RitualInstanceProvider>
        </RitualsContextProvider>
     );
}
 
export default RitualsProvider;