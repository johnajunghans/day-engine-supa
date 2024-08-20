import { polarToRectCoordinates, time24HrStringToCoordinates } from "@/app/lib/functions/polarCoordinates";
import { RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import { Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface RitualSectorProps {
    svgSize: number
    instance: RitualInstance
    outerCircleRadius: number
    setSelectedInstance: Dispatch<SetStateAction<RitualInstance | null>>
}
 
const RitualSector: React.FC<RitualSectorProps> = ({ svgSize, instance, outerCircleRadius, setSelectedInstance }) => {

    const center = svgSize/2
    const xy = {
        start: time24HrStringToCoordinates(instance.start_time, outerCircleRadius, center),
        end: time24HrStringToCoordinates(instance.end_time, outerCircleRadius, center)
    }

    const avgAngle = (xy.start[2]+xy.end[2])/2
    const avgAngleDeg = avgAngle*180/Math.PI
    const txy = polarToRectCoordinates(center, avgAngle, outerCircleRadius-15)
    

    return (
        <g id={`${instance.name}-instance-${instance.id}`}>
            <path
                d={`
                    M ${center} ${center}
                    L ${xy.start[0]} ${xy.start[1]}
                    A ${outerCircleRadius} ${outerCircleRadius} 1 0 1 ${xy.end[0]} ${xy.end[1]}
                    Z
                `}
                fill="white"
                className="drop-shadow-[0px_0px_4px_rgba(0,0,0,0.4)] hover:fill-[var(--light-grey)] duration-200 cursor-pointer"
                onClick={() => setSelectedInstance(instance)}
            />
            
            {/* {instance.name && <text 
                transform="rotate(180deg)"
                alignmentBaseline="middle" 
                x={txy.x} 
                y={txy.y}
                // className={`rotate-[${avgAngle}]deg`}
            >{reverseString(instance.name)}</text>} */}
            {instance.name && <foreignObject overflow="visible" x={txy.x} y={txy.y} alignmentBaseline="middle" height={37}>
                <Text 
                    position="absolute"
                    style={{
                        transform: `rotate(${avgAngleDeg}deg)`,
                        transformOrigin: 'center center',  // Ensures rotation around the center
                        whiteSpace: 'nowrap',  // Prevents text from wrapping, which might cause overlap
                      }}
                      className=" pointer-events-none"
                >{instance.name}</Text>
            </foreignObject>}
            
        </g>
        
     );
}
 
export default RitualSector;