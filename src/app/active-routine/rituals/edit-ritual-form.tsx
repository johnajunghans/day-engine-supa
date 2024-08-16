import { VStack, Input, Textarea, Button } from "@chakra-ui/react";
import { FormEvent, useState } from "react";

interface Ritual {
    name: string,
    description?: string
}

interface EditRitualFormProps {
    id: number,
    initialRitual: Ritual
}
 
const EditRitualForm: React.FC<EditRitualFormProps> = ({ id, initialRitual }) => {

    const [name, setName] = useState(initialRitual.name);
    const [description, setDescription] = useState(initialRitual.description);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true)

        const updatedRitual = {
            id,
            // conditionally add name and description if they have been changed
            ...(initialRitual.name !== name && { name }),
            ...(initialRitual.description !== description && { description })
        }

        const res = await fetch('http://localhost:3000/api/rituals', {
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(updatedRitual)
        })
        console.log(res.status)

        if (res.status === 304) {
            setIsLoading(false)
            
        }

    }

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
            </VStack>
            <Button
                type="submit"
                isDisabled={initialRitual.name === name && initialRitual.description === description}
                isLoading={isLoading}
            >Update Ritual</Button>
        </form>
     );
}
 
export default EditRitualForm;