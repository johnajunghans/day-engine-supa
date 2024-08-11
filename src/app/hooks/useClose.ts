import { useEffect, Dispatch, SetStateAction } from "react";

interface closeOnOffClickProps {
    id: string,
    stateUpdateFunction: Dispatch<SetStateAction<boolean>>
}

export default function useClose({ id, stateUpdateFunction }: closeOnOffClickProps) {

    useEffect(() => {
        // Function to handle clicks outside the component
        const handleClickOutside = (event: MouseEvent) => {
          const pickerContainer = document.getElementById(id);
    
          // Check if the clicked element is outside the picker container
          if (pickerContainer && !pickerContainer.contains(event.target as Node)) {
            stateUpdateFunction(false);
          }
        };
    
        // Attach the event listener when the component mounts
        document.addEventListener("mousedown", handleClickOutside);
    
        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [id, stateUpdateFunction]);
}