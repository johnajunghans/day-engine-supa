import { polarToRectCoordinates } from "../../../lib/functions/polarCoordinates";
import { useState } from "react";

interface WheelDaySelectorProps {
    svgSize: number
}

const WheelDaySelector: React.FC<WheelDaySelectorProps> = ({ svgSize }) => {

    const [activeDay, setActiveDay] = useState("Mo")

    const center = svgSize/2
    const outerCircleRadius = svgSize/2 - 40;
    const innerCircleRadius = outerCircleRadius*0.36

    const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    function handleClick(day: string): void {
        setActiveDay(day);
    }

    return (
        <g id="wheel-day-selector">
            <circle cx={center} cy={center} r={innerCircleRadius} fill="white" style={{
                filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))"
            }} />
            {days.map((day, index) => (
                <g key={day}>
                   <path d={`
                        M ${center} ${center}
                        L ${polarToRectCoordinates(center, index*51.429+64.2855, innerCircleRadius).x} ${polarToRectCoordinates(center, index*51.429+64.2855, innerCircleRadius).y}
                        A ${innerCircleRadius} ${innerCircleRadius} 1 0 1 ${polarToRectCoordinates(center, (index+1)*51.429+64.2855, innerCircleRadius).x} ${polarToRectCoordinates(center, (index+1)*51.429+64.2855, innerCircleRadius).y}
                        Z `} 
                        className="fill-white cursor-pointer peer stroke-1 stroke-[var(--light-grey)]"
                        role="button" onClick={() => {handleClick(day)}}
                    />
                    <circle 
                        cx={polarToRectCoordinates(center, (index+0.5)*51.429+64.2855, innerCircleRadius*0.75).x} 
                        cy={polarToRectCoordinates(center, (index+0.5)*51.429+64.2855, innerCircleRadius*0.75).y} 
                        r={innerCircleRadius*0.2} 
                        className={`
                            fill-white  duration-200 pointer-events-none
                            ${activeDay !== day ? "hover:fill-[#f5f5f5] peer-hover:fill-[#f5f5f5]" : ""}
                            ${activeDay === day ? "drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" : "drop-shadow-[0px_4px_4px_rgba(0,0,0,0)]"}
                        `} 
                    />
                    <text
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fill="var(--dark-gray)"
                        pointerEvents="none"
                        x={polarToRectCoordinates(center, (index+0.5)*51.429+64.2855, innerCircleRadius*0.75).x}
                        y={polarToRectCoordinates(center, (index+0.5)*51.429+64.2855, innerCircleRadius*0.75).y}
                    >{day}</text>
                </g>  
            ))}
            <circle cx={center} cy={center} r={innerCircleRadius*0.3} role="button"
                className="stroke-1 stroke-[var(--light-grey)] fill-white hover:drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:stroke-white duration-200"
            />
        </g> 
        
     );
}
 
export default WheelDaySelector;