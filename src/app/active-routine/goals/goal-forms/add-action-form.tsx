import { RadioDaySelector, TextInput, TimeInput } from "@/app/components/form-elements";
import { Action, MonthlyGoal } from "@/app/lib/interfaces/goals-interface";
import { DayOfWeek } from "@/app/lib/interfaces/rituals-interface";
import { Button, VStack } from "@chakra-ui/react";
import { Dispatch, FormEvent, FunctionComponent, SetStateAction, useState } from "react";

interface AddActionFormProps {
    setActionState: Dispatch<SetStateAction<Action[] | null>>
    goalId: number
    closeModal: VoidFunction
}
 
const AddActionForm: FunctionComponent<AddActionFormProps> = ({ goalId, setActionState, closeModal }) => {

    const [day, setDay] = useState<DayOfWeek>("Monday")
    const [startTime, setStartTime] = useState<string>("")
    const [endTime, setEndTime] = useState<string>("")
    const [summary, setSummary] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        const newAction = {
            monthly_goal_id: goalId,
            summary, 
            day, 
            start_time: startTime, 
            end_time: endTime
        }

        const res = await fetch('http://localhost:3000/api/actions', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newAction)
        })

        if (res.ok) {
            const newAction = await res.json()
            setActionState(prevState => prevState ? [...prevState, newAction] : [newAction])
            closeModal()
        }
    }

    return (  
        <form onSubmit={handleSubmit}>
            <VStack justify="flex-start" align="flex-start">
                <TextInput id="add-action-form-summary-input" value={summary} onChange={e => setSummary(e.target.value)} placeholder="Summary of Action" required />
                <RadioDaySelector day={day} setDay={setDay} />
                <TimeInput id="add-action-form-start-input" value={startTime} onChange={e => setStartTime(e.target.value)}  />
                <TimeInput id="add-action-form-end-input" value={endTime} onChange={e => setEndTime(e.target.value)} />
                <Button isLoading={isLoading} type="submit">Submit</Button>
            </VStack>
        </form>
    );
}
 
export default AddActionForm;