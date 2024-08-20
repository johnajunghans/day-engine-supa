import { Ritual, RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import { Button, Checkbox, CheckboxGroup, Input, Radio, RadioGroup, Stack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FormEvent, FunctionComponent, useState } from "react";

interface CreateInstanceFormProps {
    rituals: Ritual[]
    day: string
}

interface NewInstance {
    start_time: string,
    end_time: string,
    day: string | number,
    ritual_id: number
}
 
const CreateInstanceForm: FunctionComponent<CreateInstanceFormProps> = ({ rituals, day }) => {

    const [selectedRitual, setSelectedRitual] = useState("")
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [activeDays, setActiveDays] = useState<Array<(string | number)>>([day])
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()
    
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true)

        // generate array of new instances based on how many days
        const newInstances: NewInstance[] = [];
        activeDays.map(day => {
            const newInstance = {
                start_time: startTime,
                end_time: endTime,
                day: day,
                ritual_id: Number(selectedRitual)
            }
            newInstances.push(newInstance)
        })

        const res = await fetch('http://localhost:3000/api/ritual-instances', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(newInstances)
        })

        if (res.ok) {
            setIsLoading(false)
            router.refresh()
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
                <CheckboxGroup defaultValue={[day]} onChange={setActiveDays}>
                    <Stack direction="row">
                        <Checkbox value="Monday">Monday</Checkbox>
                        <Checkbox value="Tuesday">Tuesday</Checkbox>
                        <Checkbox value="Wednesday">Wednesday</Checkbox>
                        <Checkbox value="Thursday">Thursday</Checkbox>
                        <Checkbox value="Friday">Friday</Checkbox>
                    </Stack>
                    <Stack direction="row">
                        <Checkbox value="Saturday">Saturday</Checkbox>
                        <Checkbox value="Sunday">Sunday</Checkbox>
                    </Stack>
                </CheckboxGroup>
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