import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import { getSeason } from "@/app/lib/functions/season-functions";

interface GoalsProps {
    
}
 
const Goals: FunctionComponent<GoalsProps> = async () => {

    const supabase = createClient()
    
    const { data: user, error: userError } = await supabase.auth.getUser()
    if (userError || !user?.user) {
        redirect('/')
    }

    const season = getSeason().toLowerCase()
    const year = new Date().getFullYear()

    redirect(`goals/${season}-${year}`)

    return (
        <Flex align="center" justify="center" w="100%" h="100%" px="3rem">
            <Text color="var(--white-main)" fontSize="48px" textAlign="center">View or edit Vision or 1 Year Vision, or click on a season to begin setting monthly goals!</Text>
        </Flex>  
        
    );
}
 
export default Goals;