import { DayOfWeek, RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import WheelDaySelector from "./wheel-main-comps/WheelDaySelector";
import { useState } from "react";
import RitualSector from "./ritual-sector";

interface WheelFunctionProps {
    ritualInstances: Record<DayOfWeek, RitualInstance[]>
    svgSize: number
    outerCircleRadius: number
}
 
const WheelFunction: React.FC<WheelFunctionProps> = ({ ritualInstances, svgSize, outerCircleRadius }) => {

    // state holds the current selected day, defaulting to the current day
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = new Date().getDay()
    const [day, setDay] = useState<DayOfWeek>(weekday[today] as DayOfWeek)
    
    return ( 
        <>
            {ritualInstances[day].map(day => (
                <RitualSector key={day.id} svgSize={svgSize} instance={day} outerCircleRadius={outerCircleRadius} />
            ))}
            <WheelDaySelector svgSize={svgSize} setDay={setDay} activeDay={day} outerCircleRadius={outerCircleRadius} />
        </>
     );
}
 
export default WheelFunction;