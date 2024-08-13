export interface HabitInstanceData {
    startTime: string,
    endTime: string
}

export interface HabitInstances {
    sunday: HabitInstanceData [],
    monday: HabitInstanceData [],
    tuesday: HabitInstanceData [],
    wednesday: HabitInstanceData [],
    thursday: HabitInstanceData [],
    friday: HabitInstanceData [],
    saturday: HabitInstanceData [],
}

export interface Habit {
    name: string,
    description: string,
    instantiations: HabitInstances
}

export interface Routine {
    createdOn: string,
    lastUpdated: string,
    habits: Habit []
}

export interface Goal {
    createdOn: string,
    lastUpdatedOn: string,
    name: string,
    description: string
}

export interface Goals {
    createdOn: string,
    lastUpdatedOn: string,
    // "This is the season/month of..."
    summary: string,
    goals: Goal [],
}

export interface SeasonGoals {
    data: Goals
    months: {
        one: Goals,
        two: Goals,
        three: Goals
    }
}