import { TextAreaInput, TextInput } from "@/app/components/form-elements";
import { useMonthlyGoalsContext } from "@/app/hooks/db-context-hooks/useMonthlyGoalsContext";
import { useSeasonalGoalsContext } from "@/app/hooks/db-context-hooks/useSeasonalGoalsContext";
import { getMonthEmoji } from "@/app/lib/functions/season-functions";
import { MonthlyGoal, zodiac } from "@/app/lib/interfaces/goals-interface";
import { Button, FormLabel, HStack, Input, Radio, RadioGroup, Stack, VStack } from "@chakra-ui/react";
import { Dispatch, FormEvent, FunctionComponent, SetStateAction, useState } from "react";

interface AddGoalFormProps {
   months: zodiac[]
   closeModal: VoidFunction
   setGoalsState: Dispatch<SetStateAction<MonthlyGoal[] | null>>
   goalsState: MonthlyGoal[] | null
   seasonId: number
}
 
const AddGoalForm: FunctionComponent<AddGoalFormProps> = ({ months, closeModal, goalsState, setGoalsState, seasonId }) => {

    const [month, setMonth] = useState("")
    const [summary, setSummary] = useState("")
    const [why, setWhy] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e: FormEvent) {
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

        if (res.ok) {
            // get back goal from db
            const newGoal = await res.json()
            // update state with new goal
            const goalsStateCopy = goalsState ? [...goalsState] : []
            goalsStateCopy.push(newGoal)
            setGoalsState(goalsStateCopy)
            closeModal()
        }

    }

    return ( 
        <form onSubmit={handleSubmit}>
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
            <Button type="submit" isLoading={isLoading} isDisabled={!summary && !month}>Submit</Button>
        </form>
     );
}
 
export default AddGoalForm;