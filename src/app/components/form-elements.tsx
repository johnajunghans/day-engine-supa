import { Checkbox, CheckboxGroup, Flex, HStack, Input, Radio, RadioGroup, Stack, Textarea, VStack } from "@chakra-ui/react"
import { ChangeEventHandler, Dispatch, FunctionComponent, SetStateAction } from "react"
import { DayOfWeek } from "../lib/interfaces/rituals-interface"

interface TextInputProps {
    id?: string
    value: string
    placeholder?: string
    onChange: ChangeEventHandler<HTMLInputElement>
    required?: boolean
    size?: "md" | "lg"
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

interface TextAreaInputProps {
    id?: string
    value: string
    placeholder: string
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    required?: boolean
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
            isRequired={required}
        />
    )
}

interface TimeInputProps {
    id: string
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
    required?: boolean
}

export const TimeInput: FunctionComponent<TimeInputProps> = ({ id, value, onChange, required}) => {
    return (
        <Input 
            id={id}
            type="time"
            value={value}
            onChange={onChange}
            required={required}
            focusBorderColor="#F1B04999"
            border="1px solid var(--white-light)"
            bgColor="var(--white-bg)"
        />
    )
}

interface CheckBoxDaySelectorProps {
    day: string | number
    setActiveDays: Dispatch<SetStateAction<(string | number)[]>>
}

export const CheckBoxDaySelector: FunctionComponent<CheckBoxDaySelectorProps> = ({day, setActiveDays}) => {
    return (
        <CheckboxGroup defaultValue={[day]} onChange={setActiveDays}>
            <Stack direction="row">
                <Checkbox value="Monday">Monday</Checkbox>
                <Checkbox value="Tuesday">Tuesday</Checkbox>
                <Checkbox value="Wednesday">Wednesday</Checkbox>
                <Checkbox value="Thursday">Thursday</Checkbox>
                <Checkbox value="Friday">Friday</Checkbox>
            </Stack>
            <Stack direction="row">
                <Checkbox value="Saturday">Saturday</Checkbox>
                <Checkbox value="Sunday">Sunday</Checkbox>
            </Stack>
        </CheckboxGroup>
    )
}

interface RadioDaySelectorProps {
    day: DayOfWeek
    setDay: (nextValue: string) => void
    required: boolean
}

export const RadioDaySelector: FunctionComponent<RadioDaySelectorProps> = ({day, setDay, required}) => {
    return (
        <RadioGroup defaultValue={day} onChange={setDay} aria-required={required} w="100%" border="1px solid var(--white-light)" bgColor="var(--white-bg)" borderRadius="md" p="1rem">
            <VStack>
                <HStack gap="1rem"> 
                    <Radio value="Monday">Monday</Radio>
                    <Radio value="Tuesday">Tuesday</Radio>
                    <Radio value="Wednesday">Wednesday</Radio>
                    <Radio value="Thursday">Thursday</Radio>
                    <Radio value="Friday">Friday</Radio>
                </HStack>
                <HStack gap="1rem">
                    <Radio value="Saturday">Saturday</Radio>
                    <Radio value="Sunday">Sunday</Radio>
                </HStack>
            </VStack>
        </RadioGroup>
    )
}