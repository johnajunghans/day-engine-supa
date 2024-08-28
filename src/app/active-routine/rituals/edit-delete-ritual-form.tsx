import { ConfirmDeleteButton } from "@/app/components/buttons";
import { useRitualsContext } from "@/app/hooks/db-context-hooks/useRitualsContext";
import useClose from "@/app/hooks/useClose";
import { Ritual } from "@/app/lib/interfaces/rituals-interface";
import { VStack, Input, Textarea, Button, HStack } from "@chakra-ui/react";
import { FormEvent, useState } from "react";

interface EditDeleteRitualFormProps {
    initialRitual: Ritual
    closeModal: VoidFunction
}
 
const EditDeleteRitualForm: React.FC<EditDeleteRitualFormProps> = ({ initialRitual, closeModal }) => {

    const { ritualsDispatch } = useRitualsContext()

    const [name, setName] = useState(initialRitual.name);
    const [description, setDescription] = useState(initialRitual.description);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true)

        const updatedRitual = {
            id: initialRitual.id,
            // conditionally add name and description if they have been changed
            ...(initialRitual.name !== name && { name }),
            ...(initialRitual.description !== description && { description })
        }

        const res = await fetch('http://localhost:3000/api/rituals', {
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(updatedRitual)
        })

        if (res.ok) {
            const updatedRitual = await res.json()
            ritualsDispatch({ type: "PUT", payload: updatedRitual})
            closeModal()
        }

    }

    async function handleDeleteClick() {
        if (!confirmDelete) {
            setConfirmDelete(true)
        }
        if (confirmDelete) {
            setIsDeleteLoading(true)
            const res = await fetch('http://localhost:3000/api/rituals', {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(initialRitual.id)
            })

            if (res.ok) {
                ritualsDispatch({ type: "DELETE", payload: initialRitual})
                closeModal()
            }
        }
    }

    useClose({ id: "delete-ritual-button", stateUpdateFunction: setConfirmDelete })

    return ( 
        <form onSubmit={handleSubmit}>
            <VStack>
                <Input id="edit-ritual-form-name-input"  
                    name="name" 
                    type="text" 
                    placeholder="Ritual Name"
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    required 
                />
                <Textarea id="add-ritual-form-description-input"
                    name="description" 
                    placeholder="Description of ritual (optional)"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />    
            
                <HStack>
                    <Button
                        type="submit"
                        isDisabled={initialRitual.name === name && initialRitual.description === description}
                        isLoading={isLoading}
                    >Update Ritual</Button>
                    <ConfirmDeleteButton 
                        id="delete-ritual-button"
                        adjustedWidth={150} 
                        text="Delete Ritual" 
                        onClick={handleDeleteClick} 
                        isLoading={isDeleteLoading}
                        confirmDelete={confirmDelete} 
                    />
                </HStack>      
            </VStack>
        </form>
     );
}
 
export default EditDeleteRitualForm;