export interface MonthlyGoal {
    id: number,
    user_id: string,
    created_at: string,
    month: string,
    seasonal_goal_id: number,
    summary: string
}

export interface SeasonGoal {
   id: number,
   user_id: string,
   created_at: string,
   season: string,
   summary: string
}

export interface Action {
    id: number
    user_id: string,
    created_at: string,
    monthly_goal_id: number,
    summary: string,
    day: string,
    start_time: string,
    end_time: string
}