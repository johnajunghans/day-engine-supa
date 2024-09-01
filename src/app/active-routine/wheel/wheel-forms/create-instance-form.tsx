import { useRitualInstanceContext } from "@/app/hooks/db-context-hooks/useRitualInstanceContext";
import { useRitualsContext } from "@/app/hooks/db-context-hooks/useRitualsContext";
import { DayOfWeek, Ritual, RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import { Button, Checkbox, CheckboxGroup, Flex, HStack, Input, Radio, RadioGroup, Select, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import { Dispatch, FormEvent, FunctionComponent, useState } from "react";

interface CreateInstanceFormProps {
    day: DayOfWeek
    closeModal: VoidFunction
    setToastData: Dispatch<{ success: string, error: string }>
}
 
const CreateInstanceForm: FunctionComponent<CreateInstanceFormProps> = ({ day, closeModal, setToastData }) => {

    const { ritualsState: rituals } = useRitualsContext()

    const { ritualInstanceDispatch } = useRitualInstanceContext()

    const [selectedRitual, setSelectedRitual] = useState("")
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [activeDays, setActiveDays] = useState<DayOfWeek[]>([day])
    const [isLoading, setIsLoading] = useState(false);
    
    async function handleInstanceSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true)

        // generate array of new instances based on how many days
        const parsedRitual = JSON.parse(selectedRitual) as Ritual
            const newInstance = {
                start_time: startTime,
                end_time: endTime,
                days: activeDays,
                ritual_id: parsedRitual.id,
                name: parsedRitual.name
            }

        const res = await fetch('http://localhost:3000/api/ritual-instances', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(newInstance)
        })

        if (!res.ok) {
            const error: Error = await res.json()
            console.log(error.message)
            setToastData({ success: "", error: error.message })
            closeModal()
        }

        if (res.ok) {
            const newInstance = await res.json()
            console.log(newInstance)
            ritualInstanceDispatch({ type: "POST", payload: newInstance})
            setToastData({ success: "Instance Created", error: "" })
            closeModal()
        }
    }

    async function handleActionSubmit(e: FormEvent) {

    }

    return (
        <Tabs variant="soft-rounded">
            <TabList gap="1rem">
                <Tab>Create Ritual Instance</Tab>
                <Tab>Create Action</Tab>
            </TabList>
            <TabPanels>
            <TabPanel>
            <form onSubmit={handleInstanceSubmit}>
                <VStack gap="1rem" align="flex-start">
                    <RadioGroup name="ritual-selector" onChange={setSelectedRitual} value={selectedRitual} aria-required={true}>
                        <Stack direction='row'>
                            {rituals.map(ritual => (
                                <Radio key={ritual.id} value={JSON.stringify(ritual)}>{ritual.name}</Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                    {/* <Select placeholder="Select Ritual" onChange={setSelectedRitual}>
                        {rituals.map(ritual => (
                            <option key={ritual.id} value={JSON.stringify(ritual)}>{ritual.name}</option>
                        ))}
                    </Select> */}
                    <CheckboxGroup defaultValue={[day]} onChange={setActiveDays} required>
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
                        required 
                    />
                    <Input id="create-instance-form-end-input"
                        type="time" 
                        value={endTime} 
                        onChange={e => setEndTime(e.target.value)} 
                        required
                    />
                    <Button 
                    type="submit" 
                    isLoading={isLoading} 
                    disabled={!selectedRitual || !startTime || !endTime || !activeDays}
                >Submit</Button>
                </VStack>
            </form>
            </TabPanel>
            <TabPanel>
            <form onSubmit={handleActionSubmit}>

            </form>
            </TabPanel>
            </TabPanels>
        </Tabs> 
     );
}
 
export default CreateInstanceForm;