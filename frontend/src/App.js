import React from 'react';
import {
  ChakraProvider,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { Heading, Center, Button, Flex, Spacer, Box, Image, Stack, Divider, Badge, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import "./App.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Center className="container">
        <Flex className="nav_container">
          <h1 class="word_logo"><span data-text-fill="true" class="word_logo">
            AI EMOJI
          </span>
          </h1>
          <Spacer />
          <Button className="fuel_network" size='md'>Connect to Fuel Network</Button>
        </Flex>
        <Stack className="stack_container" direction='row'>
          <Stack className="heading_stack_container" direction="column">
            <Badge variant='outline' fontSize="1em" mb="2" colorScheme='pink'>
              Coming Soon in 2023
            </Badge>
            <Heading className="" size='xl'>
              Turn Your Memes into Emojis.
            </Heading>
            <Heading className="" size='lg'>
              AI generated emojis birthed by the best memes.
            </Heading>
            <Button className="signup_button" colorScheme='purple' size='md'>
              Signup for Beta
            </Button>
          </Stack>
        </Stack>
      </Center>
    </ChakraProvider>
  );
}

export default App;
