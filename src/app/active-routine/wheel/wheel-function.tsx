import { DayOfWeek, RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import WheelDaySelector from "./wheel-main-comps/WheelDaySelector";
import { useState } from "react";
import RitualSector from "./ritual-sector";

interface WheelFunctionProps {
    ritualInstances: Record<DayOfWeek, RitualInstance[]>
    svgSize: number
}
 
const WheelFunction: React.FC<WheelFunctionProps> = ({ ritualInstances, svgSize }) => {

    // state holds the current selected day, defaulting to the current day
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = new Date().getDay()
    const [day, setDay] = useState<DayOfWeek>(weekday[today])
    
    return ( 
        <>
            {ritualInstances[day].map(day => (
                <RitualSector key={day.id} svgSize={svgSize} instance={day} />
            ))}
            <WheelDaySelector svgSize={svgSize} setDay={setDay} activeDay={day} />
        </>
     );
}
 
export default WheelFunction;