import { polarToRectCoordinates, time24HrStringToCoordinates } from "@/app/lib/functions/polarCoordinates";
import { RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import { Text } from "@chakra-ui/react";

interface RitualSectorProps {
    svgSize: number
    instance: RitualInstance
    outerCircleRadius: number
}
 
const RitualSector: React.FC<RitualSectorProps> = ({ svgSize, instance, outerCircleRadius }) => {

    const center = svgSize/2
    const xy = {
        start: time24HrStringToCoordinates(instance.start_time, outerCircleRadius, center),
        end: time24HrStringToCoordinates(instance.end_time, outerCircleRadius, center)
    }
    
    function reverseString(str: string): string {
        return str.split('').reverse().join('');
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
                className=" drop-shadow-md"
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
                >{instance.name}</Text>
            </foreignObject>}
            
        </g>
        
     );
}
 
export default RitualSector;