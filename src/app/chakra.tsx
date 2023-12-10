import {
    ChakraBaseProvider,
    extendBaseTheme,
    theme as chakraTheme,
} from '@chakra-ui/react'

const { Button } = chakraTheme.components

export const theme = extendBaseTheme({
    components: {
        Button,
    },
})