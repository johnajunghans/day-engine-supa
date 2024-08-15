import Main from "./main";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";


export default async function ActiveRoutine() {

    // Create instance of Supabase
    const supabase = createClient()

    // Protect route by redirecting back to home page if no user is logged in
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user) {
        redirect('/')
    }

    // Query all of the user's active rituals
    const { data: rituals, error: ritualsError } = await supabase
        .from('Rituals')
        .select('*')
        .eq('user_id', userData.user.id)
        .eq('active', true)

    // check for errors 
    if (ritualsError) {
        console.log(ritualsError)
        throw new Error(ritualsError.message)
    }

    // Map all of the ritual ids into an array 
    const ritualIds = rituals.map((ritual) => ritual.id)

    // Use ritualIds array to query all of the relevant ritualInstances
    const { data: ritualInstances, error: ritualInstancesError } = await supabase
        .from('Ritual_Instances')
        .select('*')
        .in('ritual_id', ritualIds)

    // Catch any errors
    if (ritualInstancesError) {
        console.log(ritualInstancesError)
        throw new Error(ritualInstancesError.message)
    }

    return <Main rituals={rituals} ritualInstances={ritualInstances} />
}