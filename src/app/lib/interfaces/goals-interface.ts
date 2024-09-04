export interface SeasonData {
    id: number,
    user_id: string,
    created_at: string,
    season: string,
    year: number
    vision: string
 }
 

export interface MonthlyGoal {
    id: number,
    user_id: string,
    created_at: string,
    month: string,
    seasonal_id: number,
    summary: string,
    why?: string,
    complete: boolean
}

export interface Action {
    id: number
    user_id: string,
    created_at: string,
    monthly_goal_id: number | null,
    seasonal_goal_id: number | null,
    summary: string,
    day: string,
    start_time: string,
    end_time: string
}