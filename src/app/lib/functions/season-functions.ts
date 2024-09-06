type season = "Spring" | "Summer" | "Fall" | "Winter"
type zodiac = "Aries" | "Taurus" | "Gemini" | "Cancer" | "Leo" | "Virgo" | "Libra" | "Scorpio" | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces"

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
    const day = date.getDate()

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

export function getZodiac() {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()

    let zodiac: zodiac

    if ((month === 11 && day >= 21) || (month === 0 && day < 21)) {
        zodiac = "Capricorn"
    } else if ((month === 0 && day >= 21) || (month === 1 && day < 21)) {
        zodiac = "Aquarius"
    } else if ((month === 1 && day >= 21) || (month === 2 && day < 21)) {
        zodiac = "Pisces"
    } else if ((month === 2 && day >= 21) || (month === 3 && day < 21)) {
        zodiac = "Aries"
    } else if ((month === 3 && day >= 21) || (month === 4 && day < 21)) {
        zodiac = "Taurus"
    } else if ((month === 4 && day >= 21) || (month === 5 && day < 21)) {
        zodiac = "Gemini"
    } else if ((month === 5 && day >= 21) || (month === 6 && day < 21)) {
        zodiac = "Cancer"
    } else if ((month === 6 && day >= 21) || (month === 7 && day < 21)) {
        zodiac = "Leo"
    } else if ((month === 7 && day >= 21) || (month === 8 && day < 21)) {
        zodiac = "Virgo"
    } else if ((month === 8 && day >= 21) || (month === 9 && day < 21)) {
        zodiac = "Libra"
    } else if ((month === 9 && day >= 21) || (month === 10 && day < 21)) {
        zodiac = "Scorpio"
    } else if ((month === 10 && day >= 21) || (month === 11 && day < 21)) {
        zodiac = "Sagittarius"
    } else {
        throw Error("Something went wrong with the date and/or month retrieval")
    }

    return zodiac
}

export function getZodiacRange(zodiac: zodiac) {
    let range: string

    if (zodiac === "Aries") {
        range = "Mar 21 - Apr 20"
    } else if (zodiac === "Taurus") {
        range = "Apr 21 - May 20"
    } else if (zodiac === "Gemini") {
        range = "May 21 - Jun 20"
    } else if (zodiac === "Cancer") {
        range = "Jun 21 - Jul 20"
    } else if (zodiac === "Leo") {
        range = "Jul 21 - Aug 20"
    } else if (zodiac === "Virgo") {
        range = "Aug 21 - Sep 20"
    } else if (zodiac === "Libra") {
        range = "Sep 21 - Oct 20"
    } else if (zodiac === "Scorpio") {
        range = "Oct 21 - Nov 20"
    } else if (zodiac === "Sagittarius") {
        range = "Nov 21 - Dec 20"
    } else if (zodiac === "Capricorn") {
        range = "Dec 21 - Jan 20"
    } else if (zodiac === "Aquarius") {
        range = "Jan 21 - Feb 20"
    } else if (zodiac === "Pisces") {
        range = "Feb 21 - Mar 20"
    } else {
        throw Error("Input must be a zodiac sign with capitolized first letter")
    }

    return range
}

export function nextSeason(season: season, year: number): SeasonTag {
    if (season === "Spring") return {season: "Summer", year: year}
    else if (season === "Summer") return {season: "Fall", year: year}
    else if (season === "Fall") return {season: "Winter", year: year+1}
    else if (season === "Winter") return {season: "Spring", year: year}
    else throw new Error("Season is improperly defined")
}

export function getMonthsGivenSeason(season: season) {
    let months: zodiac[] = [];

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
        emoji === "🌺"
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

export function getMonthEmoji(month: zodiac) {
    let emoji: string

    if (month === "Aries") {
        emoji = "🐏"
    } else if ( month === "Taurus") {
        emoji = "🐂"
    } else if ( month === "Gemini") {
        emoji = "👯"
    } else if ( month === "Cancer") {
        emoji = "🦀"
    } else if ( month === "Leo") {
        emoji = "🦁"
    } else if ( month === "Virgo") {
        emoji = "🌬"
    } else if ( month === "Libra") {
        emoji = "⚖️"
    } else if ( month === "Scorpio") {
        emoji = "🦂"
    } else if ( month === "Sagittarius") {
        emoji = "🏹"
    } else if ( month === "Capricorn") {
        emoji = "🐐"
    } else if ( month === "Aquarius") {
        emoji = "🏺"
    } else if ( month === "Pisces") {
        emoji = "🐟"
    } else {
        throw Error("Input must be a zodiac sign with the first letter capitolized.")
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