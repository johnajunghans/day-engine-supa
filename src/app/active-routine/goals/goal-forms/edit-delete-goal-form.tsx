import { ConfirmDeleteButton } from "@/app/components/buttons";
import { TextAreaInput, TextInput } from "@/app/components/form-elements";
import { useMonthlyGoalsContext } from "@/app/hooks/db-context-hooks/useMonthlyGoalsContext";
import { useSeasonalGoalsContext } from "@/app/hooks/db-context-hooks/useSeasonalGoalsContext";
import useClose from "@/app/hooks/useClose";
import { month, MonthlyGoal, zodiac } from "@/app/lib/interfaces/goals-interface";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button, HStack, Input, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react";
import { Dispatch, FormEvent, FunctionComponent, SetStateAction, useState } from "react";

interface EditDeleteGoalFormProps {
    initialGoal: MonthlyGoal
    months: zodiac[]
    closeModal: VoidFunction
    setGoalsState: Dispatch<SetStateAction<MonthlyGoal[] | null>>
}
 
const EditDeleteGoalForm: FunctionComponent<EditDeleteGoalFormProps> = ({ initialGoal, months=null, closeModal, setGoalsState }) => {

    const [isEditLoading, setIsEditLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [summary, setSummary] = useState(initialGoal.summary)
    const [why, setWhy] = useState<string>(initialGoal.why ? initialGoal.why : "")
    const [month, setMonth] = useState<zodiac>(initialGoal.month)

    async function handleEditGoal(e: FormEvent) {
        e.preventDefault()
        setIsEditLoading(true)
        const updatedGoal = {
            id: initialGoal.id,
            ...(summary !== initialGoal.summary && { summary }),
            ...(why !== initialGoal.why && { why }),
            ...(month !== initialGoal.month && { month })
        }

        const res = await fetch("http://localhost:3000/api/monthly-goals", {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGoal)
        })

        if (res.ok) {
            const newGoal = await res.json()
            setGoalsState(prevState => prevState ? prevState.map(goal => goal.id === newGoal.id ? newGoal : goal) : [newGoal])
            closeModal()
        }
    }

    async function handleDeleteGoal() {
        if (!confirmDelete) {
            setConfirmDelete(true)
        }
        if (confirmDelete) {
            setIsDeleteLoading(true)
            const res = await fetch(`http://localhost:3000/api/monthly-goals`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(initialGoal.id)
            })

            if (res.ok) {
                setGoalsState(prevState => prevState ? prevState.filter(goal => goal.id !== initialGoal.id) : [])
                closeModal()
            }
        }
    }

    useClose({id: "delete-goal-button", stateUpdateFunction: setConfirmDelete})

    return ( 
        <form onSubmit={handleEditGoal} className="w-full p-4">
            <VStack gap="1rem" width="100%">
                <VStack gap="1rem" w="100%">
                    {months && <RadioGroup value={month} name="month-selector" onChange={setMonth}>
                        <HStack>
                            {months.map(month => (
                                <Radio key={month} value={month}>{month}</Radio>
                            ))}
                        </HStack>
                    </RadioGroup>}
                    <TextInput value={summary} onChange={e => setSummary(e.target.value)} required={true} placeholder="Goal Summary" />
                    <TextAreaInput value={why} onChange={e => setWhy(e.target.value)} placeholder="Why is this goal important?" required={false} /> 
                </VStack>
                <HStack>
                    <Button 
                        type="submit"
                        isLoading={isEditLoading}
                        isDisabled={summary === initialGoal.summary && month === initialGoal.month && why === initialGoal.why}
                    >Submit</Button>
                    <ConfirmDeleteButton 
                        id="delete-goal-button"
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