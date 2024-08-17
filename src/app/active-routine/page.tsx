import Main from "./main";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import { RitualInstance, DayOfWeek } from "../lib/interfaces/rituals-interface";

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

    const mappableRitualInstances: Record<DayOfWeek, RitualInstance[]> = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    }

    if (ritualInstances.length > 0) {
        ritualInstances.forEach(instance => {
            // update the ritual instance to include the name that corresponds to the ritual
            const updatedInstance = {
                ...instance, name: rituals.filter(ritual => ritual.id === instance.ritual_id)[0].name
            }
            mappableRitualInstances[instance.day as DayOfWeek].push(updatedInstance)
        })
        console.log(mappableRitualInstances)
    }

    return <Main rituals={rituals} ritualInstances={mappableRitualInstances} />
}