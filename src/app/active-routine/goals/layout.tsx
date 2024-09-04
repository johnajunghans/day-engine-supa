import { Box, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";
import { createClient } from "../../../../utils/supabase/server";
import { redirect, useRouter } from "next/navigation";
import { PostgrestMaybeSingleResponse, PostgrestResponse } from "@supabase/supabase-js";
import Link from "next/link";
import { getCurrentSeasonTags, getSeason } from "@/app/lib/functions/season-functions";
import SeasonNav from "./season-nav";
import { VisionTile } from "./vision-tile";

interface GoalsLayoutProps {
    children: ReactNode
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