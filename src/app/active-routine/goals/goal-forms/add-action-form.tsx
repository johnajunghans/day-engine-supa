import { ConfirmDeleteButton } from "@/app/components/buttons";
import { RadioDaySelector, TextInput, TimeInput } from "@/app/components/form-elements";
import useClose from "@/app/hooks/useClose";
import { Action, MonthlyGoal } from "@/app/lib/interfaces/goals-interface";
import { DayOfWeek } from "@/app/lib/interfaces/rituals-interface";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { Dispatch, FormEvent, FunctionComponent, SetStateAction, useState } from "react";

interface AddActionFormProps {
    setActionState: Dispatch<SetStateAction<Action[] | null>>
    goalId: number | null
    initialAction: Action | null
    closeModal: VoidFunction
}
 
const AddActionForm: FunctionComponent<AddActionFormProps> = ({ goalId, setActionState, closeModal, initialAction }) => {

    const [day, setDay] = useState<DayOfWeek>(initialAction?.day ? initialAction.day : "Monday")
    const [start_time, setStart_time] = useState<string>(initialAction?.start_time ? initialAction.start_time : "")
    const [end_time, setEnd_time] = useState<string>(initialAction?.end_time ? initialAction.end_time : "")
    const [summary, setSummary] = useState<string>(initialAction?.summary ? initialAction.summary : "")
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    async function handlePostSubmit(e: FormEvent) {
        if (!goalId) {
            throw Error("goalId does not exist!")
        }
        e.preventDefault()
        setIsLoading(true)
        const newAction = {
            monthly_goal_id: goalId,
            summary, 
            day, 
            start_time, 
            end_time
        }

        const res = await fetch('http://localhost:3000/api/actions', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newAction)
        })

        if (!res.ok) {
            throw Error("Error adding action")
        }

        if (res.ok) {
            const newAction = await res.json()
            setActionState(prevState => prevState ? [...prevState, newAction] : [newAction])
            closeModal()
        }
    }

    async function handlePutSubmit(e: FormEvent) {
        e.preventDefault()
        if (!initialAction) {
            throw Error("Initial action does not exist!")
        }
        setIsLoading(true)
        const updatedAction = {
            id: initialAction?.id,
            ...(summary !== initialAction?.summary && { summary }),
            ...(day !== initialAction?.day && { day }),
            ...(start_time !== initialAction?.start_time && { start_time }),
            ...(end_time !== initialAction?.end_time && { end_time })
        }

        const res = await fetch('http://localhost:3000/api/actions', {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedAction)
        })

        if (!res.ok) {
            throw Error(`Error updating action: ${initialAction?.summary}`)
        }

        if (res.ok) {
            const updatedAction = await res.json()
            setActionState(prevState => prevState ? prevState.map(action => action.id === updatedAction.id ? updatedAction : action) : [updatedAction])
            closeModal()
        }
    }

    async function handleDeleteClick() {
        if (!confirmDelete) {
            setConfirmDelete(true)
        } else {
            if (!initialAction) {
                throw Error("Initial action does not exist!")
            }
            setIsDeleteLoading(true)
            const res = await fetch('http://localhost:3000/api/actions', {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(initialAction?.id)
            })

            if (!res.ok) {
                throw Error(`Error deleting action: ${initialAction?.summary}`)
            }

            if (res.ok) {
                setActionState(prevState => prevState ? prevState.filter(action => action.id !== initialAction?.id) : [])
                closeModal()
            }
        }
    }

    useClose({ id: "delete-action-button", stateUpdateFunction: setConfirmDelete })

    return (  
        <form onSubmit={initialAction ? handlePutSubmit : handlePostSubmit}>
            <VStack justify="flex-start" align="flex-start">
                <TextInput id="add-action-form-summary-input" value={summary} onChange={e => setSummary(e.target.value)} placeholder="Summary of Action" required />
                <RadioDaySelector day={day} setDay={setDay} required />
                <TimeInput id="add-action-form-start-input" value={start_time} onChange={e => setStart_time(e.target.value)} required />
                <TimeInput id="add-action-form-end-input" value={end_time} onChange={e => setEnd_time(e.target.value)} required />
                <HStack>
                    <Button 
                        isLoading={isLoading} 
                        type="submit"
                        isDisabled={initialAction ? (summary === initialAction.summary && day === initialAction.day && start_time === initialAction.start_time && end_time === initialAction.end_time) : false}
                    >Submit</Button>
                    {initialAction && 
                    <ConfirmDeleteButton 
                        id="delete-action-button"  
                        isLoading={isDeleteLoading}
                        confirmDelete={confirmDelete}
                        text="Delete Action"
                        adjustedWidth={140}
                        onClick={handleDeleteClick}
                    />}
                </HStack>
            </VStack>
        </form>
    );
}
 
export default AddActionForm;