// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ThemeContextProvider } from './context/themeContext'
import { theme } from './theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
        <ThemeContextProvider>
            {children}
        </ThemeContextProvider>
    </ChakraProvider>
)
}