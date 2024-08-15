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