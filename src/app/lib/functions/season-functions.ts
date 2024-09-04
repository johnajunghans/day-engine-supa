type season = "Spring" | "Summer" | "Fall" | "Winter"

type SeasonTag = {
    season: season,
    year: number
}

interface SeasonTagWithEmoji {
    seasonTag: SeasonTag,
    emoji: string
}

export function getSeason(): season {

    const date = new Date()
    const month = date.getMonth()
    const day = date.getDay()

    let season: season

    if ( month === 0 || month === 1 ) {
        season = "Winter"
    } else if ( month === 2 && day < 20 ) {
        season = "Winter"
    } else if ( month === 2 && day >= 20 ) {
        season = "Spring"
    } else if ( month === 3 || month === 4 ) {
        season = "Spring"
    } else if ( month === 5 && day < 20 ) {
        season = "Spring"
    } else if ( month === 5 && day >= 20 ) {
        season = "Summer"
    } else if ( month === 6 || month === 7) {
        season = "Summer"
    } else if ( month === 8 && day < 20 ) {
        season = "Summer"
    } else if ( month === 8 && day >= 20 ) {
        season = "Fall"
    } else if ( month === 9 || month === 10 ) {
        season = "Fall"
    } else if ( month === 11 && day < 20 ) {
        season = "Fall"
    } else if ( month === 11 && day >= 20 ) {
        season = "Winter"
    } else {
        throw new Error("Season is not valid")
    }

    return season
}

export function nextSeason(season: season, year: number): SeasonTag {
    if (season === "Spring") return {season: "Summer", year: year}
    else if (season === "Summer") return {season: "Fall", year: year}
    else if (season === "Fall") return {season: "Winter", year: year+1}
    else if (season === "Winter") return {season: "Spring", year: year}
    else throw new Error("Season is improperly defined")
}

export function getMonthsGivenSeason(season: season) {
    let months = [];

    if (season === 'Spring') {
        months = ["Aries", "Taurus", "Gemini"]
    } else if (season === 'Summer') {
        months = ["Cancer", "Leo", "Virgo"]
    } else if (season === 'Fall') {
        months = ["Libra", "Scorpio", "Sagittarius"]
    } else if (season === 'Winter') {
        months = ["Capricorn", "Aquarius", "Pisces"]
    } else {
        throw new Error("Season is not defined properly.")
    }

    return months
}

export function getSeasonEmoji(season: season): string {
    let emoji: string = ""

    if (season === 'Spring') {
        emoji === "🌱"
    } else if (season === 'Summer') {
        emoji = "☀️"
    } else if (season === 'Fall') {
        emoji = "🍁"
    } else if (season === 'Winter') {
        emoji = "❄️"
    } else {
        throw new Error("Season is not defined properly.")
    }

    return emoji
} 

export function getCurrentSeasonTags(): SeasonTagWithEmoji[] {
    const season = getSeason()
    const year = new Date().getFullYear()
    const emoji = getSeasonEmoji(season)
    let tag: SeasonTagWithEmoji = { seasonTag: { season, year }, emoji: emoji }
    let arr: SeasonTagWithEmoji[] = []
    arr.push(tag)


    for (let i=1; i < 4; i++) {
        tag = {seasonTag: nextSeason(tag.seasonTag.season, tag.seasonTag.year), emoji: emoji }
        const newEmoji = getSeasonEmoji(tag.seasonTag.season)
        arr.push({ seasonTag: { season: tag.seasonTag.season, year: tag.seasonTag.year }, emoji: newEmoji})
    }
    return arr
}