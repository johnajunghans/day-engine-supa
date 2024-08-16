import { Button, Flex, HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import RitualTile from "./ritual-tile";

interface CreateRitualProps {
    
}

interface Ritual {
    name: string;
    description: string;
}

const CreateRitual: React.FC<CreateRitualProps> = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [rituals, setRituals] = useState<Ritual[]>([]);

    const router = useRouter()

    function handleAddRitual() {
        const newRitual = { name, description }
        setRituals(prevRituals => [...prevRituals, newRitual])
        setName("");
        setDescription("");
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true)

        const res = await fetch('http://localhost:3000/api/rituals', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rituals)
        })

        if (res.status === 201) {
            setIsLoading(false);
            router.refresh()
        }
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <VStack>
                <Input id="add-ritual-form-name-input"  
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
            <Flex id="create-rituals-form-preview"
                flexDir="column"
                gap="1rem"
            >
                <Text>Preview:</Text>
                <ol>
                    {rituals.map(ritual => (
                        <li>{ritual.name}</li>
                    ))}
                </ol>
            </Flex>
            <HStack>
                <Button id="submit-rituals-btn"
                    type="submit"
                    isLoading={isLoading}
                    isDisabled={rituals.length == 0}
                >Create New Ritual</Button>
                <Button id="add-ritual-btn"
                    isDisabled={name.length == 0}
                    onClick={handleAddRitual}
                >Add Ritual</Button>
            </HStack>
        </form>
     );
}

export default CreateRitual
 
