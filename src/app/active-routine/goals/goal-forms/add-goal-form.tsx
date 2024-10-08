import { useMonthlyGoalsContext } from "@/app/hooks/db-context-hooks/useMonthlyGoalsContext";
import { useSeasonalGoalsContext } from "@/app/hooks/db-context-hooks/useSeasonalGoalsContext";
import { Button, FormLabel, HStack, Input, Radio, RadioGroup, Stack, VStack } from "@chakra-ui/react";
import { FormEvent, FunctionComponent, useState } from "react";

interface AddGoalFormProps {
   addModalData: {season: string, months: string[]} | null
   closeModal: VoidFunction
}
 
const AddGoalForm: FunctionComponent<AddGoalFormProps> = ({ addModalData, closeModal }) => {

    const [month, setMonth] = useState("")
    const [goalType, setGoalType] = useState<"seasonal" | "monthly" | null>(null)
    const [summary, setSummary] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { seasonalGoalsDispatch } = useSeasonalGoalsContext()
    const { monthlyGoalsDispatch } = useMonthlyGoalsContext()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        const newGoal = {
            // map_id: genRandomNumber(),
            summary,
            ...(goalType === "monthly" ? { month } : { season: addModalData?.season })
        }

        const res = await fetch(`http://localhost:3000/api/${goalType}-goals`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newGoal)
        })

        if (res.ok) {
            const newGoal = await res.json()
            if (goalType === "seasonal") {
                seasonalGoalsDispatch({ type: 'POST', payload: newGoal })
            }

            if (goalType === "monthly") {
                monthlyGoalsDispatch({ type: 'POST', payload: newGoal })
            }
            closeModal()
        }

    }

    return ( 
        <form onSubmit={handleSubmit}>
            <VStack justify="flex-start" align="flex-start" gap="1.5rem" m="0 1rem 1rem">
                <RadioGroup name="goal-type-selector" onChange={setGoalType} >
                    <FormLabel bgColor="white" p="3px" display="inline-block" borderRadius="5px">Seasonal or Monthly Goal</FormLabel>
                    <HStack gap="1rem">
                        <Radio value="seasonal">Seasonal</Radio>
                        <Radio value="monthly">Monthly</Radio>
                    </HStack>
                </RadioGroup>
               
                {/* <RadioGroup name="season-selector" onChange={setSeason} value={season}>
                    
                    <Stack direction='row'>   
                        <Radio value="Spring">Spring</Radio>
                        <Radio value="Summer">Summer</Radio>
                        <Radio value="Fall">Fall</Radio>
                        <Radio value="Winter">Winter</Radio>
                    </Stack>
                </RadioGroup> */}

                {goalType === "monthly" && <RadioGroup name="month-selector" onChange={setMonth} value={month}>
                    <FormLabel bgColor="white" p="3px" display="inline-block" borderRadius="5px">Select Month</FormLabel>
                    <HStack gap="1rem">   
                        {addModalData?.months.map(month => (
                            <Radio key={month} value={month}>{month}</Radio>
                        ))}
                    </HStack>
                </RadioGroup>}
                <Input value={summary} onChange={e => setSummary(e.target.value)} placeholder="Summary" required />
            </VStack>
            <Button type="submit" isLoading={isLoading} isDisabled={!goalType || !summary}>Submit</Button>
        </form>
     );
}
 
export default AddGoalForm;