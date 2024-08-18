'use client'

import { useRef, useState, useLayoutEffect } from "react";
import WheelOutline from "./wheel-main-comps/WheelOutline";
import WheelDaySelector from "./wheel-main-comps/WheelDaySelector";
import { DayOfWeek, RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import WheelFunction from "./wheel-function";

interface WheelMainProps {
    ritualInstances: Record<DayOfWeek, RitualInstance[]>
}

const WheelMain: React.FC<WheelMainProps> = ({ ritualInstances }) => {
    const wheelMainRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    

    function handleResize() {
        if (wheelMainRef.current) {
            const dimensions = wheelMainRef.current?.getBoundingClientRect()
            setDimensions({
                width: dimensions?.width,
                height: dimensions?.height
            })
        }
    }

    useLayoutEffect(() => {
        handleResize();
    }, [])

    // const debouncedResize = debounce(handleResize, 500);
    // window.addEventListener('resize', debouncedResize)

    // useEffect(() => {
    //     window.removeEventListener('resize', debouncedResize);
    //     debouncedResize.cancel()
    //     console.log(dimensions)
    // }, [dimensions])
    
    
    //checks if width or height is greater in WheelMain. The smaller of the two determines the size of the svg.
    const svgSize = dimensions.width >= dimensions.height ? dimensions.height : dimensions.width;
    const outerCircleRadius = svgSize/2 - 40;

    return ( 
        <div id="wheel-main" ref={wheelMainRef} className="w-full h-full flex items-center justify-center">
            <svg width={svgSize} height={svgSize} overflow="visible">
                {svgSize && <WheelOutline svgSize={svgSize} outerCircleRadius={outerCircleRadius} />}
                {svgSize && <WheelFunction svgSize={svgSize} ritualInstances={ritualInstances} outerCircleRadius={outerCircleRadius} />}
            </svg>
        </div>
     );
}
 
export default WheelMain;


