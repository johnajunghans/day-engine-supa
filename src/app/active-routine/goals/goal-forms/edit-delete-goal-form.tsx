import { ConfirmDeleteButton } from "@/app/components/buttons";
import useClose from "@/app/hooks/useClose";
import { MonthlyGoal, SeasonGoal } from "@/app/lib/interfaces/goals-interface";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button, HStack, Input, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react";
import { FormEvent, FunctionComponent, useState } from "react";

interface EditDeleteGoalFormProps {
    initialGoal: SeasonGoal | MonthlyGoal
    months: string[] | null
    closeModal: VoidFunction
}
 
const EditDeleteGoalForm: FunctionComponent<EditDeleteGoalFormProps> = ({ initialGoal, months=null, closeModal }) => {

    const [isEditLoading, setIsEditLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [summary, setSummary] = useState(initialGoal.summary)
    const [month, setMonth] = useState(
        'month' in initialGoal ? initialGoal.month : undefined
    );

    const goalType = 'month' in initialGoal ? "monthly" : "seasonal"

    async function handleEditGoal(e: FormEvent) {
        e.preventDefault()
        setIsEditLoading(true)
        const updatedGoal = {
            id: initialGoal.id,
            ...(summary !== initialGoal.summary && { summary }),
            ...(goalType === 'monthly' && { month })
        }

        const res = await fetch(`http://localhost:3000/api/${goalType}-goals`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGoal)
        })

        if (res.ok) {
            closeModal()
        }
    }

    async function handleDeleteGoal() {
        if (!confirmDelete) {
            setConfirmDelete(true)
        }
        if (confirmDelete) {
            setIsDeleteLoading(true)
            const res = await fetch(`http://localhost:3000/api/${goalType}-goals`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(initialGoal.id)
            })

            if (res.ok) {
                closeModal()
            }
        }
    }

    useClose({id: "delete-goal-button", stateUpdateFunction: setConfirmDelete})

    return ( 
        <form onSubmit={handleEditGoal} className="w-full p-4">
            <VStack gap="1rem" width="100%">
                <VStack gap="1rem" w="100%">
                    <Input value={summary} onChange={e => setSummary(e.target.value)} />
                    {months && <RadioGroup value={month} name="month-selector" onChange={setMonth}>
                        <HStack>
                            {months.map(month => (
                                <Radio value={month}>{month}</Radio>
                            ))}
                        </HStack>
                    </RadioGroup>}  
                </VStack>
                <HStack>
                    <Button 
                        type="submit"
                        isLoading={isEditLoading}
                        isDisabled={summary === initialGoal.summary && ('month' in initialGoal && month === initialGoal.month)}
                    >Submit</Button>
                    <ConfirmDeleteButton 
                        text="Delete Goal"
                        onClick={handleDeleteGoal}
                        isLoading={isDeleteLoading}
                        confirmDelete={confirmDelete}
                        adjustedWidth={140}
                    />  
                </HStack>
            </VStack>
        </form>
     );
}
 
export default EditDeleteGoalForm;