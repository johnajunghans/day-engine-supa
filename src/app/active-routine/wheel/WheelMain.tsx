'use client'

import { useRef, useState, useLayoutEffect } from "react";
import WheelOutline from "./wheel-main-comps/WheelOutline";
import WheelDaySelector from "./wheel-main-comps/WheelDaySelector";
import { DayOfWeek, Ritual, RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import WheelFunction from "./wheel-function";
import { Flex } from "@chakra-ui/react";
import { useThemeContext } from "@/app/hooks/useThemeContext";

interface WheelMainProps {

}

const WheelMain: React.FC<WheelMainProps> = () => {
    const wheelMainRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const { theme } = useThemeContext()
    

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
        <Flex id="wheel-main" ref={wheelMainRef} border="1px solid var(--de-orange-light)" borderRadius="md" className="min-w-[calc(100vh-2rem)] min-h-[calc(100vh-2rem)] w-full h-full flex items-center justify-center">
            <svg width={svgSize} height={svgSize} overflow="visible">
                {svgSize && <WheelOutline svgSize={svgSize} outerCircleRadius={outerCircleRadius} />}
                {svgSize && <WheelFunction svgSize={svgSize} outerCircleRadius={outerCircleRadius} />}
            </svg>
        </Flex>
     );
}
 
export default WheelMain;


