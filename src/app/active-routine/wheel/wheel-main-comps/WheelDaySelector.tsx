import { DayOfWeek } from "@/app/lib/interfaces/rituals-interface";
import { polarToRectCoordinates } from "../../../lib/functions/polarCoordinates";
import { Dispatch, SetStateAction } from "react";
import { AddIcon } from "@chakra-ui/icons";
import Image from "next/image";

interface WheelDaySelectorProps {
    svgSize: number,
    setDay: Dispatch<SetStateAction<DayOfWeek>>,
    activeDay: DayOfWeek,
    outerCircleRadius: number
}

const WheelDaySelector: React.FC<WheelDaySelectorProps> = ({ svgSize, setDay, activeDay, outerCircleRadius }) => {

    const center = svgSize/2
    const innerCircleRadius = outerCircleRadius*0.36

    // value equal to 1/7 of a full cicle (in radians)
    const angSclr = 0.8976

    // value to adjust rotation of entire day selector (in radians) - currently equal to 1.25x angSclr value
    const angAdjr = 1.122

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    function handleClick(day: DayOfWeek): void {
        setDay(day);
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
                        L ${polarToRectCoordinates(center, index*angSclr+angAdjr, innerCircleRadius).x} ${polarToRectCoordinates(center, index*angSclr+angAdjr, innerCircleRadius).y}
                        A ${innerCircleRadius} ${innerCircleRadius} 1 0 1 ${polarToRectCoordinates(center, (index+1)*angSclr+angAdjr, innerCircleRadius).x} ${polarToRectCoordinates(center, (index+1)*angSclr+angAdjr, innerCircleRadius).y}
                        Z `} 
                        className="fill-white cursor-pointer peer stroke-1 stroke-[var(--light-grey)]"
                        role="button" onClick={() => {handleClick(day as DayOfWeek)}}
                    />
                    <circle 
                        cx={polarToRectCoordinates(center, (index+0.5)*angSclr+angAdjr, innerCircleRadius*0.75).x} 
                        cy={polarToRectCoordinates(center, (index+0.5)*angSclr+angAdjr, innerCircleRadius*0.75).y} 
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
                        x={polarToRectCoordinates(center, (index+0.5)*angSclr+angAdjr, innerCircleRadius*0.75).x}
                        y={polarToRectCoordinates(center, (index+0.5)*angSclr+angAdjr, innerCircleRadius*0.75).y}
                    >{day.slice(0,2)}</text>
                </g>  
            ))}
            <circle cx={center} cy={center} r={innerCircleRadius*0.3} role="button"
                className="stroke-1 stroke-[var(--light-grey)] fill-white hover:drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:stroke-white duration-200"
            />
            <foreignObject width={40} height={40} x={center-20} y={center-20} className=" pointer-events-none">
                <Image src="/plus.svg" alt="add" width={40} height={40} />
            </foreignObject>
        </g> 
        
     );
}
 
export default WheelDaySelector;