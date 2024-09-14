import { TextAreaInput } from "@/app/components/form-elements";
import { SeasonData } from "@/app/lib/interfaces/goals-interface";
import { Button, VStack } from "@chakra-ui/react";
import { Dispatch, FormEvent, FunctionComponent, SetStateAction, useState } from "react";

interface EditVisionFormProps {
    initialVision: string
    id: number
    setSeasonalData: Dispatch<SetStateAction<SeasonData | null>>
    closeModal: VoidFunction
}
 
const EditVisionForm: FunctionComponent<EditVisionFormProps> = ({ initialVision, id, setSeasonalData, closeModal }) => {

    const [vision, setVision] = useState(initialVision)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        const updatedVision = {
            id,
            seasonal_vision: vision
        }

        const res = await fetch('http://localhost:3000/api/seasonal-data', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedVision)
        })

        if (!res.ok) {
            throw Error("Error updating vision")
        }

        if (res.ok) {
            const updatedVision = await res.json()
            setSeasonalData(updatedVision)
            closeModal()
        }
    }

    return (  
        <form onSubmit={handleSubmit}>
            <VStack alignItems="flex-start">
                <TextAreaInput 
                    id="vision-textarea-input"
                    value={vision}
                    onChange={e => setVision(e.target.value)}
                    placeholder="What is you vision..."
                    height="200px"
                />
                <Button type="submit" isLoading={isLoading} isDisabled={vision === initialVision}>Submit</Button>
            </VStack>
        </form>
    );
}
 
export default EditVisionForm;