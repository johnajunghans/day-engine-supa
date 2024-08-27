import { Action, MonthlyGoal, SeasonGoal } from "@/app/lib/interfaces/goals-interface";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import SeasonalGoalTile from "./seasonal-goal-tile";
import { CreateNewBtn } from "@/app/components/buttons";
import ModalMain from "@/app/components/modal";
import AddGoalForm from "./goal-forms/add-goal-form";
import EditDeleteGoalForm from "./goal-forms/edit-delete-goal-form";

interface GoalsProps {
    actions: Action[]
}
 
const Goals: FunctionComponent<GoalsProps> = ({ actions }) => {

    const [addModalData, setAddModalData] = useState<{season: string, months: string[]} | null>(null)
    const [editDeleteModalData, setEditDeleteModalData] = useState<{initialGoal: SeasonGoal | MonthlyGoal, months: string[] | null} | null>(null)

    const { isOpen: isAddGoalModalOpen, onClose: closeAddGoalModal, onOpen: openAddGoalModal } = useDisclosure()
    const { isOpen: isEditDeleteGoalModalOpen, onClose: closeEditDeleteGoalModal, onOpen: openEditDeleteGoalModal } = useDisclosure()
    
    const year = new Date().getFullYear()

    useEffect(() => {
        if (addModalData) {
            openAddGoalModal()
        }
    }, [addModalData])

    useEffect(() => {
        if (editDeleteModalData) {
            openEditDeleteGoalModal()
        }
    }, [editDeleteModalData])

    return ( 
        <Flex id="goals-container" width="100%" h="100%" p="1rem" flexDir="column" justify="flex-start" align="center" pos="relative">
                <SeasonalGoalTile
                    year={year}
                    actions={actions}
                    setAddModalData={setAddModalData}
                    setEditDeleteModalData={setEditDeleteModalData}
                />
            {/* <CreateNewBtn onClick={openAddGoalModal} position="bottom-5 left-5" /> */}
            <ModalMain 
                isOpen={isAddGoalModalOpen} 
                onClose={closeAddGoalModal} 
                modalTitle="Add New Goal"
            >
                <AddGoalForm 
                    addModalData={addModalData} 
                    closeModal={closeAddGoalModal} 
                />
            </ModalMain>
            <ModalMain 
                isOpen={isEditDeleteGoalModalOpen} 
                onClose={closeEditDeleteGoalModal} 
                modalTitle={`Upate Goal: ${editDeleteModalData?.initialGoal.summary}`}
            >
                {editDeleteModalData && <EditDeleteGoalForm 
                    initialGoal={editDeleteModalData.initialGoal} 
                    months={editDeleteModalData.months} 
                    closeModal={closeEditDeleteGoalModal} 
                />}
            </ModalMain>
        </Flex>
     );
}
 
export default Goals;