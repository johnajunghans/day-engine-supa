import { ConfirmDeleteButton } from "@/app/components/buttons";
import { TextAreaInput, TextInput } from "@/app/components/form-elements";
import { useMonthlyGoalsContext } from "@/app/hooks/db-context-hooks/useMonthlyGoalsContext";
import { useSeasonalGoalsContext } from "@/app/hooks/db-context-hooks/useSeasonalGoalsContext";
import { getMonthEmoji } from "@/app/lib/functions/season-functions";
import { MonthlyGoal, zodiac } from "@/app/lib/interfaces/goals-interface";
import { Button, FormLabel, HStack, Input, Radio, RadioGroup, Stack, VStack } from "@chakra-ui/react";
import { Dispatch, FormEvent, FunctionComponent, SetStateAction, useState } from "react";

interface GoalFormProps {
   months: zodiac[]
   closeModal: VoidFunction
   setGoalsState: Dispatch<SetStateAction<MonthlyGoal[] | null>>
   seasonId: number | null
   initialGoal: MonthlyGoal | null
}
 
const GoalForm: FunctionComponent<GoalFormProps> = ({ months, closeModal, setGoalsState, seasonId, initialGoal }) => {

    const [month, setMonth] = useState(initialGoal?.month ? initialGoal.month : months[0])
    const [summary, setSummary] = useState(initialGoal?.summary ? initialGoal.summary : "")
    const [why, setWhy] = useState(initialGoal?.why ? initialGoal.why : "")
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    async function handlePostSubmit(e: FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        const newGoal = {
            summary,
            month,
            why,
            season_id: seasonId
        }

        const res = await fetch(`http://localhost:3000/api/monthly-goals`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newGoal)
        })

        if (!res.ok) {
            throw Error("Error adding new goal")
        }

        if (res.ok) {
            // get back goal from db
            const newGoal = await res.json()
            // update state with new goal
            setGoalsState(prevState => prevState ? [...prevState, newGoal] : [newGoal])
            closeModal()
        }

    }

    async function handlePutSubmit(e: FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        const updatedGoal = {
            id: initialGoal?.id,
            ...(summary !== initialGoal?.summary && { summary }),
            ...(why !== initialGoal?.why && { why }),
            ...(month !== initialGoal?.month && { month })
        }

        const res = await fetch("http://localhost:3000/api/monthly-goals", {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGoal)
        })

        if (!res.ok) {
            throw Error(`Error updated goal: ${initialGoal?.summary}`)
        }

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
                body: JSON.stringify(initialGoal?.id)
            })

            if (!res.ok) {
                throw Error(`Error updated goal: ${initialGoal?.summary}`)
            }

            if (res.ok) {
                setGoalsState(prevState => prevState ? prevState.filter(goal => goal.id !== initialGoal?.id) : [])
                closeModal()
            }
        }
    }

    return ( 
        <form onSubmit={initialGoal ? handlePutSubmit : handlePostSubmit}>
            <VStack justify="flex-start" align="flex-start" gap="1rem" m="0 1rem 1rem">
                <RadioGroup name="month-selector" onChange={setMonth} value={month} w="100%">
                    <VStack w="100%" border="1px solid var(--white-light)" p="1rem" borderRadius="md">
                        <FormLabel display="inline-block" >Select Month</FormLabel>
                        <HStack gap="1rem" justifyContent="space-evenly" w="100%">   
                            {months.map(month => (
                                <Radio key={month} value={month}>{`${month} ${getMonthEmoji(month)}`}</Radio>
                            ))}
                        </HStack>
                    </VStack>
                </RadioGroup>
                <TextInput 
                    value={summary} 
                    onChange={e => setSummary(e.target.value)} 
                    placeholder="Summary" 
                    required={true}
                />
                <TextAreaInput 
                   value={why}
                   onChange={e => setWhy(e.target.value)}
                   placeholder="How does this goal help you acheive your vision?"
                   required={true}
                />
            </VStack>
            <HStack>
                <Button 
                    type="submit" 
                    isLoading={isLoading} 
                    isDisabled={initialGoal ? (summary === initialGoal.summary && month === initialGoal.month && why === initialGoal.why) : false}
                >Submit</Button>
                {initialGoal && 
                    <ConfirmDeleteButton 
                        id="delete-goal-button"
                        text="Delete Goal"
                        onClick={handleDeleteGoal}
                        isLoading={isDeleteLoading}
                        confirmDelete={confirmDelete}
                        adjustedWidth={140}
                    />}
            </HStack>
            
        </form>
     );
}
 
export default GoalForm;