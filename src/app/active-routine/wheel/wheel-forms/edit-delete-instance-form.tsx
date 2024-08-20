import { Ritual, RitualInstance } from "@/app/lib/interfaces/rituals-interface";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Checkbox, CheckboxGroup, HStack, Input, Radio, RadioGroup, Stack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FormEvent, FunctionComponent, useState } from "react";

interface EditDeleteInstanceFormProps {
    instance: RitualInstance
}
 
const EditDeleteInstanceForm: FunctionComponent<EditDeleteInstanceFormProps> = ({ instance }) => {

    const [startTime, setStartTime] = useState(instance.start_time);
    const [endTime, setEndTime] = useState(instance.end_time);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false)

    const router = useRouter()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        const updatedInstance = {
            id: instance.id,
            ...(startTime !== instance.start_time && { start_time: startTime }),
            ...(endTime !== instance.end_time && { end_time: endTime })
        }

        const res = await fetch('http://localhost:3000/api/ritual-instances', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedInstance)
        })

        if (!res.ok) {
            setIsLoading(false);
        }

        if(res.ok) {
            setIsLoading(false);
            router.refresh()
        }
    }

    async function handleDeleteClick() {
        if (!confirmDelete) {
            return setConfirmDelete(true)
        }
        if (confirmDelete) {
            setIsLoading(true)
            const res = await fetch('http://localhost:3000/api/ritual-instances', {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(instance.id)
            })
            if (res.ok) {
                setIsLoading(false)
                router.refresh()
            }
        }
    }

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
                <HStack>
                    <Button 
                        type="submit" 
                        isLoading={isLoading}
                        isDisabled={startTime === instance.start_time && endTime === instance.end_time}
                    >Submit</Button>
                    <Button
                        rightIcon={<DeleteIcon boxSize={4} />}
                        colorScheme="red"
                        onClick={handleDeleteClick}
                    >{confirmDelete ? "Delete Instance" : ""}</Button>
                </HStack>
            </VStack>
        </form>
     );
}
 
export default EditDeleteInstanceForm;