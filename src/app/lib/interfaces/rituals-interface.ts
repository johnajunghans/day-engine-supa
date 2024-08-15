export interface RitualInstance {
    id: number,
    created_at: string,
    day: string,
    startTime: string,
    endTime: string
}

export interface Ritual {
    id: number,
    user_id: string,
    created_at: string,
    last_updated_at: string,
    active: boolean,
    name: string,
    description?: string,
}
