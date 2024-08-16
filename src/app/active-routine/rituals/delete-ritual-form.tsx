import { Button } from "@chakra-ui/react";
import { FormEvent, useState } from "react";

interface DeleteRitualFormProps {
    id: number
}
 
const DeleteRitualForm: React.FC<DeleteRitualFormProps> = ({ id }) => {

    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        const res = await fetch('http://localhost:3000/api/rituals', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(id)
        })

        if (res.ok) {
            setIsLoading(false)
        }
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <Button
                type="submit" 
                colorScheme="red"
                isLoading={isLoading}
            >Delete Ritual</Button>
        </form>
     );
}
 
export default DeleteRitualForm;