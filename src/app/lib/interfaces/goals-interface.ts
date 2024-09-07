export type season = "Spring" | "Summer" | "Fall" | "Winter"
export type zodiac = "Aries" | "Taurus" | "Gemini" | "Cancer" | "Leo" | "Virgo" | "Libra" | "Scorpio" | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces"
export type month = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December"

export interface SeasonData {
    id: number,
    user_id: string,
    created_at: string,
    season: string,
    year: number
    seasonal_vision: string
 }
 

export interface MonthlyGoal {
    id: number,
    user_id: string,
    created_at: string,
    month: zodiac,
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
    summary: string,
    day?: string,
    start_time?: string,
    end_time?: string
}