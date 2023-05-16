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
      <Center className="container"></Center>
    </ChakraProvider>
  );
}

export default App;
