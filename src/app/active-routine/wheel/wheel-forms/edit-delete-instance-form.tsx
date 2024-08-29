import { ConfirmDeleteButton } from "@/app/components/buttons";
import { useRitualInstanceContext } from "@/app/hooks/db-context-hooks/useRitualInstanceContext";
import useClose from "@/app/hooks/useClose";
import { RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import { Button, Checkbox, CheckboxGroup, HStack, Input, Stack, VStack } from "@chakra-ui/react";
import { Dispatch, FormEvent, FunctionComponent, useState } from "react";

interface EditDeleteInstanceFormProps {
    instance: RitualInstance
    closeModal: VoidFunction
    setToastData: Dispatch<{ success: string, error: string }>
}
 
const EditDeleteInstanceForm: FunctionComponent<EditDeleteInstanceFormProps> = ({ instance, closeModal, setToastData }) => {

    const { ritualInstanceDispatch } = useRitualInstanceContext()
    
    const [startTime, setStartTime] = useState(instance.start_time);
    const [endTime, setEndTime] = useState(instance.end_time);
    const [activeDays, setActiveDays] = useState(instance.days)
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        const updatedInstance = {
            id: instance.id,
            days: activeDays,
            ...(startTime !== instance.start_time && { start_time: startTime }),
            ...(endTime !== instance.end_time && { end_time: endTime })
        }

        const res = await fetch('http://localhost:3000/api/ritual-instances', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedInstance)
        })

        if (!res.ok) {
            const error: Error = await res.json()
            console.log(error.message)
            closeModal()
            setToastData({ success: "", error: error.message })
        }

        if(res.ok) {
            const instanceResponse = await res.json()
            ritualInstanceDispatch({ type: "PUT", payload: instanceResponse})
            closeModal()
            setToastData({ success: "Instance Updated", error: "" }) 
        }
    }

    async function handleDeleteClick() {
        if (!confirmDelete) {
            return setConfirmDelete(true)
        }
        if (confirmDelete) {
            setIsDeleteLoading(true)
            const res = await fetch('http://localhost:3000/api/ritual-instances', {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(instance.id)
            })

            if (!res.ok) {
                const error: Error = await res.json()
                console.log(error.message)
                closeModal()
                setToastData({ success: "", error: error.message })
            }

            if (res.ok) {
                ritualInstanceDispatch({ type: "DELETE", payload: instance })
                closeModal()
                setToastData({ success: "Instance Deleted", error: "" })
            }
        }
    }

    useClose({ id: "delete-instance-button", stateUpdateFunction: setConfirmDelete })

    return ( 
        <form onSubmit={handleSubmit}>
            <VStack>
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
                <CheckboxGroup defaultValue={activeDays} onChange={setActiveDays} required>
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
                <HStack>
                    <Button 
                        type="submit" 
                        isLoading={isLoading}
                        isDisabled={startTime === instance.start_time && endTime === instance.end_time && activeDays === instance.days}
                    >Submit</Button>
                    <ConfirmDeleteButton
                        id="delete-instance-button"
                        confirmDelete={confirmDelete}
                        isLoading={isDeleteLoading}
                        onClick={handleDeleteClick}
                        text="Delete Instance"                    
                        adjustedWidth={150}
                    />
                </HStack>
            </VStack>
        </form>
     );
}
 
export default EditDeleteInstanceForm;