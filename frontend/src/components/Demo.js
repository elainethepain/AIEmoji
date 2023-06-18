import React from 'react';
import { Link } from "react-router-dom"
import { useWallet } from "fuels-react";
import { useState } from "react";
import { Heading, Center, Button, Flex, Spacer, Input, InputGroup, Stack, InputRightAddon, Badge, Text } from '@chakra-ui/react';
import { Logo } from '../Logo';
import Meme from './Meme';
import "../css/Meme.css";

function Demo() {
  const wallet = useWallet();
  return (
    <>
      <Center className="container">
        <Flex as="nav" boxShadow="sm" className="nav_container">
          <h1 class="word_logo"><span data-text-fill="true" class="word_logo">
            <Link to="/home">AI EMOJI</Link>
          </span>
          </h1>
          <Spacer />
          {wallet.isConnected ? (
            <Button className="fuel_network" size='md' onClick={wallet.disconnect}>Disconnect</Button>

          ) : (
            <Button className="fuel_network" size='md' onClick={wallet.connect}>Connect to Fuel Network</Button>
          )}

        </Flex>
        <Stack className="searchbar" spacing={2}>
          <InputGroup>
            <Input type='text' placeholder='Search Memes' />
            <InputRightAddon children='.com' />
          </InputGroup>
        </Stack>
        <Meme />
      </Center>
    </>
  );
}

export default Demo;
