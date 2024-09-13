import { RadioDaySelector, TextInput, TimeInput } from "@/app/components/form-elements";
import { Button, VStack } from "@chakra-ui/react";
import { FormEvent, FunctionComponent, useState } from "react";

interface EditDeleteActionFormProps {
    
}
 
const EditDeleteActionForm: FunctionComponent<EditDeleteActionFormProps> = () => {

    const [isLoading, setIsLoading] = useState(false)
    const []

    async function handleSubmitEdit(e: FormEvent) {
        e.preventDefault()

        const updatedAction = {

        }

        const res = await fetch('http://localhost:3000/api/actions', {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedAction)
        })
    }

    return (  
        <form onSubmit={handleSubmitEdit}>
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
 
export default EditDeleteActionForm;