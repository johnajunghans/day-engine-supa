import React from 'react';
import { timeRawHoursToCoordinates } from '../../../lib/functions/polarCoordinates'

interface WheelOutlineProps {
    svgSize: number,
    miliTime?: boolean,
    risingTime?: string
}

interface TimeMarkerProps {
    marker: string,
    index: number
}

const WheelOutline: React.FC<WheelOutlineProps> = ({ svgSize, miliTime=false, risingTime="06:00" }) => {
    
    const center = svgSize/2
    const outerCircleRadius = svgSize/2 - 40;
    const innerCircleRadius = outerCircleRadius*0.36

    const rotations = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345];
    const regTimeMarkers = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"];
    const miliTimeMarkers = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00"];

    const TimeMarker: React.FC<TimeMarkerProps> = ({ marker, index }) => {
        return (
            <text
                textAnchor="middle"
                alignmentBaseline="middle"
                x={timeRawHoursToCoordinates(6, -index+6, outerCircleRadius*1.075, center)[0]} 
                y={timeRawHoursToCoordinates(6, -index+6, outerCircleRadius*1.055, center)[1]}
                fill="var(--light-grey)"
                fontSize="12px"
            >{marker}</text>
        )
    }

    return (
        <g id='wheel-outline'> 
            {/* <circle id="background-circle" cx={center} cy={center} r={outerCircleRadius+45} className="fill-[#FFFFFF]" fillOpacity={0.33} stroke='var(--de-orange)' />  */}
            <circle cx={center} cy={center} r={outerCircleRadius} fill="white" stroke="var(--light-gray)" strokeWidth="1" />
            <g id='wheel-svg-lines-container'>
                 {rotations.map( rot => (
                    <path key={rot}
                        d={`M ${center-innerCircleRadius} ${center} L ${center-outerCircleRadius*1.03} ${center}`}
                        style={{transform: `rotate(${rot}deg)`, transformOrigin: `${center}px ${center}px`}}
                        stroke="var(--light-grey)" strokeWidth="1"
                    />
                ))}
            </g>
            <g id='wheel-svg-time-markers-container'>
                {miliTime ? miliTimeMarkers.map((marker, index) => (
                    <TimeMarker key={marker} marker={marker} index={index} />
                )) :
                regTimeMarkers.map((marker, index) => (
                    <TimeMarker key={marker} marker={marker} index={index} />
                ))
                } 
            </g>
        </g> 
     );
};
 
export default WheelOutline;