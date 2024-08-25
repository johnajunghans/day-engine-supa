import { Action, MonthlyGoal, SeasonGoal } from "@/app/lib/interfaces/goals-interface";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import SeasonalGoalTile from "./seasonal-goal-tile";
import { CreateNewBtn } from "@/app/components/buttons";
import ModalMain from "@/app/components/modal";
import AddGoalForm from "./goal-forms/add-goal-form";

interface GoalsProps {
    seasonalGoals: SeasonGoal[]
    monthlyGoals: MonthlyGoal[],
    actions: Action[]
}
 
const Goals: FunctionComponent<GoalsProps> = ({ seasonalGoals, monthlyGoals, actions }) => {

    const [addModalData, setAddModalData] = useState<{season: string, months: string[]} | null>(null)

    const { isOpen: isAddGoalModalOpen, onClose: closeAddGoalModal, onOpen: openAddGoalModal } = useDisclosure()
    
    const year = new Date().getFullYear()

    useEffect(() => {
        if (addModalData) {
            openAddGoalModal()
        }
    }, [addModalData])

    return ( 
        <Flex id="goals-container" width="100%" h="100%" p="1rem" flexDir="column" justify="flex-start" align="center" pos="relative">
                <SeasonalGoalTile
                    seasonalGoals={seasonalGoals}
                    year={year}
                    monthlyGoals={monthlyGoals}
                    actions={actions}
                    setAddModalData={setAddModalData}
                />
            {/* <CreateNewBtn onClick={openAddGoalModal} position="bottom-5 left-5" /> */}
            <ModalMain isOpen={isAddGoalModalOpen} onClose={closeAddGoalModal} modalTitle="Add New Goal">
                <AddGoalForm addModalData={addModalData} closeModal={closeAddGoalModal} />
            </ModalMain>
        </Flex>
     );
}
 
export default Goals;