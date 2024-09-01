import { DayOfWeek, Ritual, RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import WheelDaySelector from "./wheel-main-comps/WheelDaySelector";
import { useEffect, useState } from "react";
import RitualSector from "./ritual-sector";
import ModalMain from "@/app/components/modal";
import CreateInstanceForm from "./wheel-forms/create-instance-form";
import { useDisclosure, useToast } from "@chakra-ui/react";
import EditDeleteInstanceForm from "./wheel-forms/edit-delete-instance-form";
import { useRitualInstanceContext } from "@/app/hooks/db-context-hooks/useRitualInstanceContext";
import { useActionsContext } from "@/app/hooks/db-context-hooks/useActionsContext";
import ActionSector from "./action-sector";

interface WheelFunctionProps {
    svgSize: number
    outerCircleRadius: number
}
 
const WheelFunction: React.FC<WheelFunctionProps> = ({ svgSize, outerCircleRadius }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isEditDeleteModalOpen, onOpen: openEditDeleteModal, onClose: closeEditDeleteModal } = useDisclosure()
    const toast = useToast()

    const { ritualInstanceState: ritualInstances } = useRitualInstanceContext()
    const { actionsState: actions } = useActionsContext()

    const [selectedInstance, setSelectedInstance] = useState<RitualInstance | null>(null)

    // state holds the current selected day, defaulting to the current day
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = new Date().getDay()
    const [day, setDay] = useState<DayOfWeek>(weekday[today] as DayOfWeek)
    const [toastData, setToastData] = useState({ success: "", error: "" })

    useEffect(() => {
        if (selectedInstance) {
            openEditDeleteModal()
        }
    }, [selectedInstance])

    function closeModalRegenState() {
        setSelectedInstance(null);
        closeEditDeleteModal();
    }

    useEffect(() => {
        if (toastData.success || toastData.error) {
            toast({
                title: toastData.success ? 'Success' : 'Error',
                description: toastData.success ? toastData.success : toastData.error,
                status: toastData.success ? 'success' : 'error',
                duration: toastData.success ? 3000 : 9000,
                isClosable: true,
            })
            setToastData({ success: "", error: "" })
        }
    }, [toastData])

    return ( 
        <>
            {ritualInstances[day].map(day => (
                <RitualSector key={day.id} svgSize={svgSize} instance={day} outerCircleRadius={outerCircleRadius} setSelectedInstance={setSelectedInstance} />
            ))}
            {actions.filter(action => action.day === day).map(action => (
                <ActionSector key={action.id} svgSize={svgSize} action={action} outerCircleRadius={outerCircleRadius} />
            ))}
            <WheelDaySelector svgSize={svgSize} setDay={setDay} activeDay={day} outerCircleRadius={outerCircleRadius} openAddModal={onOpen} />
            <foreignObject overflow="visible">
                <ModalMain isOpen={isOpen} onClose={onClose} modalTitle="Create New:" >
                    <CreateInstanceForm day={day} closeModal={onClose} setToastData={setToastData} />   
                </ModalMain>
                {selectedInstance && <ModalMain isOpen={isEditDeleteModalOpen} onClose={closeModalRegenState} modalTitle={`Update Ritual Instance: ${selectedInstance?.name}`}>
                    <EditDeleteInstanceForm instance={selectedInstance} closeModal={closeEditDeleteModal} setToastData={setToastData} />
                </ModalMain>}
            </foreignObject>
        </>
     );
}
 
export default WheelFunction;