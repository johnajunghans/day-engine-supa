export function getSeason() {

    const date = new Date()
    const month = date.getMonth()
    const day = date.getDay()

    let season = ""

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

export function getMonthsGivenSeason(season: string) {
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