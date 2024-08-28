import { DayOfWeek, Ritual, RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import WheelDaySelector from "./wheel-main-comps/WheelDaySelector";
import { useEffect, useState } from "react";
import RitualSector from "./ritual-sector";
import ModalMain from "@/app/components/modal";
import CreateInstanceForm from "./wheel-forms/create-instance-form";
import { useDisclosure } from "@chakra-ui/react";
import EditDeleteInstanceForm from "./wheel-forms/edit-delete-instance-form";

interface WheelFunctionProps {
    ritualInstances: Record<DayOfWeek, RitualInstance[]>
    svgSize: number
    outerCircleRadius: number
    rituals: Ritual[]
}
 
const WheelFunction: React.FC<WheelFunctionProps> = ({ ritualInstances, svgSize, outerCircleRadius, rituals }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isEditDeleteModalOpen, onOpen: openEditDeleteModal, onClose: closeEditDeleteModal } = useDisclosure()

    const [selectedInstance, setSelectedInstance] = useState<RitualInstance | null>(null)

    // state holds the current selected day, defaulting to the current day
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = new Date().getDay()
    const [day, setDay] = useState<DayOfWeek>(weekday[today] as DayOfWeek)

    useEffect(() => {
        if (selectedInstance) {
            openEditDeleteModal()
        }
    }, [selectedInstance])

    function closeModalRegenState() {
        setSelectedInstance(null);
        closeEditDeleteModal();
    }

    return ( 
        <>
            {ritualInstances[day].map(day => (
                <RitualSector key={day.id} svgSize={svgSize} instance={day} outerCircleRadius={outerCircleRadius} setSelectedInstance={setSelectedInstance} />
            ))}
            <WheelDaySelector svgSize={svgSize} setDay={setDay} activeDay={day} outerCircleRadius={outerCircleRadius} openAddModal={onOpen} />
            <foreignObject overflow="visible">
                <ModalMain isOpen={isOpen} onClose={onClose} modalTitle="Create New Ritual Instance" >
                    <CreateInstanceForm rituals={rituals} day={day} closeModal={onClose} />   
                </ModalMain>
                {selectedInstance && <ModalMain isOpen={isEditDeleteModalOpen} onClose={closeModalRegenState} modalTitle={`Update Ritual Instance: ${selectedInstance?.name}`}>
                    <EditDeleteInstanceForm instance={selectedInstance} />
                </ModalMain>}
            </foreignObject>
        </>
     );
}
 
export default WheelFunction;