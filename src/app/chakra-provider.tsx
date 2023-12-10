'use client'
import { ChakraProvider } from '@chakra-ui/react'

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider >
            {children}
        </ChakraProvider>
    )
}