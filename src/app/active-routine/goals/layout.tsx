import { Box, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";
import { createClient } from "../../../../utils/supabase/server";
import { redirect, useRouter } from "next/navigation";
import { PostgrestMaybeSingleResponse, PostgrestResponse } from "@supabase/supabase-js";
import Link from "next/link";
import { getCurrentSeasonTags } from "@/app/lib/functions/season-functions";
import SeasonNav from "./season-nav";

interface GoalsLayoutProps {
    children: ReactNode
}

interface VisionTileProps {
    title: string,
    content: string | undefined
    indentWidth: number
    variant: "vision" | "focus"
}

type UserData = {
    user_id: string,
    vision: string,
    one_year_vision: string
}
 
const GoalsLayout: FunctionComponent<GoalsLayoutProps> = async ({ children }) => {

    const supabase = createClient()
    
    const { data: user, error: userError } = await supabase.auth.getUser()
    if (userError || !user?.user) {
        redirect('/')
    }

    const { data: userData, error: userDataError }: PostgrestMaybeSingleResponse<UserData> = await supabase
        .from('User_Data')
        .select('*')
        .eq('user_id', user?.user.id)
        .single()

    if (userDataError) {
        console.log(userDataError)
        throw Error(userDataError.message)
    } 

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
                <Text display="inline" fontSize="16px" className=" antialiased" color="var(--white-main)">{content}</Text>
            </Box>
        ) 
    }

    

    return ( 
        <Box id="goals-layout-outer-container" display="grid" gridTemplateColumns="1fr 3fr" gap="1rem">
            <Box id="vision-and-yearly-container" display="grid" minW="320px" maxW="600px" gridTemplateRows="auto 1fr 1fr" gap="1rem">
                <SeasonNav />
                <VisionTile title="VISION" content={userData?.vision} indentWidth={60} variant="vision" />
                <VisionTile title="1 Year Vision" content={userData?.one_year_vision} indentWidth={100} variant="focus" />
            </Box>
            { children }
        </Box>
    );
}
 
export default GoalsLayout;