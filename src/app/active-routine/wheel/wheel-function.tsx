import { DayOfWeek, Ritual, RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import WheelDaySelector from "./wheel-main-comps/WheelDaySelector";
import { useState } from "react";
import RitualSector from "./ritual-sector";
import ModalMain from "@/app/components/modal";
import CreateInstanceForm from "./wheel-forms/create-instance-form";
import { useDisclosure } from "@chakra-ui/react";

interface WheelFunctionProps {
    ritualInstances: Record<DayOfWeek, RitualInstance[]>
    svgSize: number
    outerCircleRadius: number
    rituals: Ritual[]
}
 
const WheelFunction: React.FC<WheelFunctionProps> = ({ ritualInstances, svgSize, outerCircleRadius, rituals }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // state holds the current selected day, defaulting to the current day
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = new Date().getDay()
    const [day, setDay] = useState<DayOfWeek>(weekday[today] as DayOfWeek)
    
    return ( 
        <>
            {ritualInstances[day].map(day => (
                <RitualSector key={day.id} svgSize={svgSize} instance={day} outerCircleRadius={outerCircleRadius} />
            ))}
            <WheelDaySelector svgSize={svgSize} setDay={setDay} activeDay={day} outerCircleRadius={outerCircleRadius} openAddModal={onOpen} />
            <foreignObject overflow="visible">
                <ModalMain isOpen={isOpen} onClose={onClose} modalTitle="Create New Ritual Instance" >
                    <CreateInstanceForm rituals={rituals} day={day} />    
                </ModalMain>
            </foreignObject>
        </>
     );
}
 
export default WheelFunction;