import { Dispatch, SetStateAction, useEffect } from "react";

interface useModalProps {
    state: any | null,
    state2?: any | null,
    setState: Dispatch<SetStateAction<any | null>>, 
    setState2?: Dispatch<SetStateAction<any | null>>
    isOpen: boolean, 
    open: VoidFunction
}

export default function useModal({state, setState, isOpen, open, state2, setState2}: useModalProps): void {
    useEffect(() => { 
        if (state2 ? state || state2 : state) {
            open()
        }
    }, [state, state2])

    useEffect(() => {
        if (!isOpen) {
            setState(null)
            if (setState2) { 
                setState2(null) 
            }
        }
    }, [isOpen])
}