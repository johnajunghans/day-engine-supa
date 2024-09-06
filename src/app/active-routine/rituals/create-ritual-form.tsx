import { Button, Flex, FormLabel, HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useRitualsContext } from "@/app/hooks/db-context-hooks/useRitualsContext";
import { TextAreaInput, TextInput } from "@/app/components/form-elements";

interface CreateRitualFormProps {
    closeModal: VoidFunction
}

const CreateRitualForm: React.FC<CreateRitualFormProps> = ({ closeModal }) => {

    const { ritualsDispatch } = useRitualsContext()

    const [name, setName] = useState("");
    const [what, setWhat] = useState("");
    const [where, setWhere] = useState("");
    const [why, setWhy] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true)

        const ritual = { name, what, where, why }

        const res = await fetch('http://localhost:3000/api/rituals', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ritual)
        })

        if (res.ok) {
            const newRitual = await res.json()
            ritualsDispatch({ type: "POST", payload: newRitual })
            closeModal()
        }
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <VStack alignItems="flex-start" gap="0.75rem">
                <TextInput 
                    id="add-ritual-form-name-input"
                    value={name}
                    placeholder="Ritual Name"
                    onChange={e => setName(e.target.value)}
                    required={true}
                    size="lg"
                />
                <TextAreaInput 
                    id="add-ritual-form-name-input"
                    value={what}
                    placeholder="Description of ritual"
                    onChange={e => setWhat(e.target.value)}
                    required={true}
                />
                <TextAreaInput 
                    id="add-ritual-form-name-input"
                    value={where}
                    placeholder="Where does this ritual occur?"
                    onChange={e => setWhere(e.target.value)}
                    required={true}
                />
                <TextAreaInput 
                    id="add-ritual-form-name-input"
                    value={why}
                    placeholder="Why does this ritual matter to you?"
                    onChange={e => setWhy(e.target.value)}
                    required={true}
                />
                <Button id="submit-rituals-btn"
                    type="submit"
                    isLoading={isLoading}
                    bgColor="var(--de-orange)"
                    _hover={{ bgColor: "var(--de-orange-dark)"}}
                >Create New Ritual</Button>
            </VStack>
        </form>
     );
}

export default CreateRitualForm
 
