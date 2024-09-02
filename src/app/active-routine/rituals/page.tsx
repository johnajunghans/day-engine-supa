import { FunctionComponent } from "react";
import RitualsContainer from './rituals'
import { Box, Flex } from "@chakra-ui/react";
import WheelMain from "../wheel/WheelMain";
import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import { DayOfWeek, Ritual, RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import { PostgrestError, PostgrestMaybeSingleResponse, PostgrestResponse } from "@supabase/supabase-js";
import RitualsProvider from "./rituals-provider";

interface RitualsProps {
    
}
 
const Rituals: FunctionComponent<RitualsProps> = async ({ }) => {
    
    // instantiate supabase
    const supabase = createClient()

    // verify user
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user) {
        redirect('/')
    }

    // try fetching rituals data 
    const { data: rituals, error: ritualsError }: PostgrestResponse<Ritual> = await supabase
        .from('Rituals')
        .select('*')
        .eq('user_id', userData.user?.id)
    
    // catch errors getting rituals
    if (ritualsError) {
        console.log(ritualsError)
        throw new Error(ritualsError?.message)
    }

    // create mappable object of ritual instances and include name based on ritual
    const mappableRitualInstances: Record<DayOfWeek, RitualInstance[]> = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    }

    // conditionally fetch instances if there are rituals
    if (rituals && rituals.length > 0) {
        // generate array of ritual ids
        const ritualIds = rituals.map(ritual => ritual.id)

        const { data: ritualInstances, error: ritualInstancesError }: PostgrestResponse<RitualInstance> = await supabase
        .from('Ritual_Instances')
        .select('*')
        .in('ritual_id', ritualIds)

        // catch errors getting ritual instances
        if (ritualInstancesError) {
            console.log(ritualInstancesError)
            throw new Error(ritualInstancesError?.message)
        }

        // push all instances to mappable array if there are any instances
        if (ritualInstances && ritualInstances.length > 0) {
            ritualInstances.forEach(instance => {
                // update the ritual instance to include the name that corresponds to the ritual
                // const updatedInstance = {
                //     ...instance, name: rituals.filter(ritual => ritual.id === instance.ritual_id)[0].name
                // }
                instance.days.forEach(day => {
                    mappableRitualInstances[day as DayOfWeek].push(instance)
                }) 
            })
        } 
    }

    console.log(userData.user.id)
        
    return <RitualsProvider 
                rituals={rituals ? rituals : []} 
                ritualInstances={mappableRitualInstances} 
            />
}
 
export default Rituals;