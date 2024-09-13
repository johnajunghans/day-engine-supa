import { Dispatch, SetStateAction, useEffect } from "react";

interface useModalProps {
    state: any | null, 
    setState: Dispatch<SetStateAction<any | null>>, 
    isOpen: boolean, 
    open: VoidFunction
}

export default function useModal({state, setState, isOpen, open}: useModalProps): void {
    useEffect(() => { 
        if (state) {
            open()
        }
    }, [state])
    
    useEffect(() => {
        if (!isOpen) {
            setState(null)
        }
    }, [isOpen])
}