import { Ritual } from "@/app/lib/interfaces/rituals-interface";
import { Button, Input, Radio, RadioGroup, Stack, VStack } from "@chakra-ui/react";
import { FormEvent, FunctionComponent, useState } from "react";

interface CreateInstanceFormProps {
    rituals: Ritual[]
    day: string
}
 
const CreateInstanceForm: FunctionComponent<CreateInstanceFormProps> = ({ rituals, day }) => {

    const [selectedRitual, setSelectedRitual] = useState("")
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true)
        const newInstance = {
            start_time: startTime,
            end_time: endTime,
            day: day,
            ritual_id: Number(selectedRitual)
        }

        const res = await fetch('http://localhost:3000/api/ritual-instances', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(newInstance)
        })

        if (res.ok) {
            setIsLoading(false)
        }
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <VStack>
                <RadioGroup name="ritual-selector" onChange={setSelectedRitual} value={selectedRitual}>
                    <Stack direction='row'>
                        {rituals.map(ritual => (
                            <Radio key={ritual.id} value={`${ritual.id}`}>{ritual.name}</Radio>
                        ))}
                    </Stack>
                </RadioGroup>
                <Input id="create-instance-form-start-input"
                    type="time" 
                    value={startTime} 
                    onChange={e => setStartTime(e.target.value)} 
                />
                <Input id="create-instance-form-end-input"
                    type="time" 
                    value={endTime} 
                    onChange={e => setEndTime(e.target.value)} 
                />
            </VStack>
            <Button type="submit" isLoading={isLoading}>Submit</Button>
        </form>
     );
}
 
export default CreateInstanceForm;