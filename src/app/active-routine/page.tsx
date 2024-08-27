import Main from "./main";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import { RitualInstance, DayOfWeek } from "../lib/interfaces/rituals-interface";
import { getMonthsGivenSeason, getSeason } from "../lib/functions/season-functions";


export default async function ActiveRoutine() {

    // Create instance of Supabase
    const supabase = createClient()

    // Protect route by redirecting back to home page if no user is logged in
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user) {
        redirect('/')
    }

    // console.log(userData.user.id)

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

    // create mappable object of ritual instances and include name based on ritualßß
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
    }

    // FOR DEV, CURRENT SEASON HARDCODED AS FALL
    // const currentSeason = getSeason()
    const currentSeason = "Fall"

    const months = getMonthsGivenSeason(currentSeason)

    // fetch the active seasonal goal(s)
    const { data: seasonalGoals, error: seasonalGoalsError } = await supabase
        .from('Seasonal_Goals')
        .select('*')
        .eq('user_id', userData.user.id)
        .eq('season', currentSeason)
    
    if (seasonalGoalsError) {
        console.log(seasonalGoalsError.message)
        throw new Error(seasonalGoalsError.message)
    }

    // get all seasonal goal ids and export to array
    const seasonalGoalIds = seasonalGoals.map((goal) => goal.id)

    // fetch all monthly goals based on seasonal goal ids
    const { data: monthlyGoals, error: monthlyGoalsError } = await supabase 
        .from('Monthly_Goals')
        .select('*')
        .in('month', months);

    if (monthlyGoalsError) {
        console.log(monthlyGoalsError.message)
        throw new Error(monthlyGoalsError.message)
    }

    // get all monthly goal ids and export into array
    const monthlyGoalIds = monthlyGoals.map(goal => goal.id)

    // fetch all actions based on monthly goal ids
    // const { data: actions, error: actionsError } = await supabase
    //     .from('Actions')
    //     .select('*')
    //     .in('monthly_goal_id', monthlyGoalIds)

    const { data: actions, error: actionsError } = await supabase
        .from('Actions')
        .select('*')
        .or(
            `monthly_goal_id.in.(${monthlyGoalIds.join(',')}),seasonal_goal_id.in.(${seasonalGoalIds.join(',')})`
        );
    
    if (actionsError) {
        console.log(actionsError)
        throw new Error(actionsError.message)
    }

    console.log("All data fetched from server")

    return (
            <Main 
                rituals={rituals} 
                ritualInstances={mappableRitualInstances} 
                seasonalGoals={seasonalGoals} 
                monthlyGoals={monthlyGoals} 
                actions={actions} 
            />
        )
}