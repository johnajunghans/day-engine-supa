import { Input, Textarea } from "@chakra-ui/react"
import { ChangeEventHandler, FunctionComponent } from "react"

interface TextInputProps {
    id?: string
    value: string
    placeholder: string
    onChange: ChangeEventHandler<HTMLInputElement>
    required: boolean
    size?: "md" | "lg"
}

interface TextAreaInputProps {
    id?: string
    value: string
    placeholder: string
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    required: boolean
}

export const TextInput: FunctionComponent<TextInputProps> = ({ id, value, placeholder, onChange, required, size="md" }) => {
   return (
        <Input 
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            type="text"
            name={placeholder}
            border="1px solid var(--white-light)"
            bgColor="var(--white-bg)"
            required={required}
            focusBorderColor="#F1B04999"
            height={size === "lg" ? "60px" : "40px"}
            textAlign={size === "lg" ? "center" : "unset"}
            fontSize={size === "lg" ? "24px" : "18px"}
        />
   )
}

export const TextAreaInput: FunctionComponent<TextAreaInputProps> = ({ id, value, placeholder, onChange, required }) => {
    return (
        <Textarea 
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            name={placeholder}
            border="1px solid var(--white-light)"
            bgColor="var(--white-bg)"
            required={required}
            focusBorderColor="#F1B04999"
        />
    )
}