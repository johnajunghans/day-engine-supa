import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { createClient } from "../../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import { PostgrestMaybeSingleResponse, PostgrestResponse } from "@supabase/supabase-js";
import { Action, MonthlyGoal, SeasonData } from "@/app/lib/interfaces/goals-interface";
import MonthlyGoals from "../monthly-goals";

interface SeasonGoalsProps {
    params: { season: string }
}

// export async function generateStaticParams() {
//     const seasons = ['spring', 'summer', 'fall', 'winter'];

//     return seasons.map(season => ({
//         season,
//     }));
// }
 
const SeasonGoals: FunctionComponent<SeasonGoalsProps> = async ({ params }) => {

    const supabase = createClient()
    
    const { data: user, error: userError } = await supabase.auth.getUser()
    if (userError || !user?.user) {
        redirect('/')
    }

    const paramSplit = params.season.split('-')
    const season = capitalizeFirstLetter(paramSplit[0])
    const year = paramSplit[1]

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // fetch season data for season
    const { data: seasonData, error: seasonDataError }: PostgrestMaybeSingleResponse<SeasonData> = await supabase
        .from('Seasonal_Data')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('season', season)
        .single()

    if (seasonDataError) {
        console.log(seasonDataError)
        // throw Error(seasonDataError.message)
    }

    // create data for season if it does not exist
    let newSeasonData = null
    if (!seasonData) {
        const newSeason = {
            season, year
        }

        const { data, error }: PostgrestMaybeSingleResponse<SeasonData> = await supabase
            .from('Seasonal_Data')
            .insert(newSeason)
            .select()
            .single()
        
        if (error) {
            console.log(error)
            throw Error(error.message)
        }

        newSeasonData = data
    }

    if (!seasonData && !newSeasonData) {
        throw Error ("Error fetching season data")
    }

    // fetch monthly goals if season data exists
    let monthlyGoals = null
    if (seasonData) {
         const { data: monthlyGoalsData, error: monthlyGoalsError }: PostgrestResponse<MonthlyGoal> = await supabase
            .from('Monthly_Goals')
            .select('*')
            .eq('season_id', seasonData.id)
        
        if (monthlyGoalsError) {
            console.log(monthlyGoalsError)
            throw Error(monthlyGoalsError.message)
        }

        monthlyGoals = monthlyGoalsData
    }

    // fetch actions if monthly goals exist
    let actions: Action[] | null = null
    if (monthlyGoals) {
        const monthlyGoalIds = monthlyGoals.map(goal => goal.id)

        const { data, error }: PostgrestResponse<Action> = await supabase
            .from('Actions')
            .select('*')
            .in('monthly_goal_id', monthlyGoalIds)
        
        if (error) {
            console.log(error)
            throw Error(error.message)
        }

        actions = data
    }

    return (  
        <MonthlyGoals 
            seasonData={newSeasonData ? newSeasonData : seasonData} 
            monthlyGoals={monthlyGoals}
            actions={actions} 
        />
    );
}
 
export default SeasonGoals;