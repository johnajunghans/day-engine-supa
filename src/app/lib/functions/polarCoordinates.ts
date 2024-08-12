// Takes in 24 hour time string and outputs the raw hours as a decimal
export function time24HrStringToRawHours(time: string) {
    const hour = Number(time.slice(0, 2));
    const min = Number(time.slice(3,5));
    return hour*1+min/60;
}

// Takes in querent time and rising time as raw hours and outputs angle measure in degrees 
export function timeRawHoursToDegrees(querentTime: number, risingTime: number) {
    return (querentTime.valueOf() - risingTime.valueOf())*15;
}

// Bundles the functionality of the above two functions
export function time24HrStringToDegrees(querentTime: string, risingTime: string) {
    function time24HrStringToRawHours(time: string) {
        const hour = Number(time.slice(0, 2));
        const min = Number(time.slice(3,5));
        return hour*1+min/60;
    }
    const querentHours = time24HrStringToRawHours(querentTime);
    const risingHours = time24HrStringToRawHours(risingTime);
    return (querentHours.valueOf() - risingHours.valueOf())*15;
}

// Takes in raw hours of querent and rising times as well as the radius of the circle and outputs an array with x and y coordinates
export function timeRawHoursToCoordinates(querentTime: number, risingTime: number, radius: number, center: number) {
    const timeDifferenceInRadians = (querentTime.valueOf() - risingTime.valueOf())*Math.PI/12;
    return [center-(radius.valueOf()*Math.cos(timeDifferenceInRadians)), center-(radius.valueOf()*Math.sin(timeDifferenceInRadians))]
}

// Full functionality; takes in 24 hour times as strings plus radius and outputs coordinates 
export function time24HrStringToCoordinates(querentTime: string, risingTime: string, radius: number, center: number) {
    function time24HrStringToRawHours(time: string) {
        const hour = Number(time.slice(0, 2));
        const min = Number(time.slice(3,5));
        return hour*1+min/60;
    }
    const querentHours = time24HrStringToRawHours(querentTime);
    const risingHours = time24HrStringToRawHours(risingTime);
    const timeDifferenceInRadians = (querentHours.valueOf() - risingHours.valueOf())*Math.PI/12;
    return [center-(radius.valueOf()*Math.cos(timeDifferenceInRadians)), center-(radius.valueOf()*Math.sin(timeDifferenceInRadians))]
}

export function polarToRectCoordinates(center: number, angle: number, radius: number) {
    return {
        x: center-radius*Math.cos(angle*Math.PI/180),
        y: center-radius*Math.sin(angle*Math.PI/180)
    }
}

