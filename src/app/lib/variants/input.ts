import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const primary = definePartsStyle({
    field: {
        bgColor: "black",
        border: "black"
    }
})

export const inputTheme = defineMultiStyleConfig({
    variants: { primary }
})