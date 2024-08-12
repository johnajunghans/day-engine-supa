'use client'

import { Box, Button, Flex, HStack, Input, InputGroup, InputLeftAddon, VStack } from '@chakra-ui/react';
import { useThemeContext } from '../hooks/useThemeContext'
import { login, signup } from './actions'
import Image from 'next/image';
import ThemeSelector from '../theme-selector';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {

    const theme = useThemeContext();
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit() {
        setIsLoading(true);
    }

  return (
    <Flex id='login-background' align="center" justify="center" bgColor={theme.theme.light} h="100vh">
        <Link href="/" className='absolute top-4 left-4 text-xl'>⬅</Link>
        <Flex id='login-form-container' align="center" justify="center" bgColor={theme.theme.dark} h="50%" w="33%" minW="400px" minH="400px" p="2rem" borderRadius="md" border="1px solid" borderColor="brand.500" pos="relative" >
            <Image src="/logo.png" alt='logo-image' width={100} height={100} className="absolute top-4 left-4 animate-logo-spin" />
            <Box className='absolute right-4 bottom-4'><ThemeSelector /></Box>
            <form className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
                <VStack>
                    <VStack w="100%">   
                        <Input id="login-email-input" name="email" type="email" placeholder='Email' focusBorderColor='brand.500' color="white" isRequired />
                        <Input id="login-password-input" name="password" type="password" placeholder='Password' focusBorderColor='brand.500' color="white" isRequired />
                    </VStack>
                    <HStack>
                        <Button id="login-button" variant="primary" w="100px" type='submit' isLoading={isLoading} formAction={login}>Login</Button>
                        <Button id="account-request-button" variant="secondary">Request an Account</Button>
                    </HStack>
                </VStack>   
            </form>
        </Flex>  
    </Flex>
    
  )
}