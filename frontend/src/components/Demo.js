import React, { useEffect, useState } from 'react';
import { API_KEY } from "@env";
import { Link } from "react-router-dom"
import { useWallet } from "fuels-react";
import { Heading, Center, Button, Flex, Spacer, Input, InputGroup, Stack, InputRightAddon, Badge, Text } from '@chakra-ui/react';
import { Logo } from '../Logo';
import Meme from './Meme';
import "../css/Meme.css";

function Demo() {

  const fetchImages = () => {
    fetch('https://ronreiter-meme-generator.p.rapidapi.com/images', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'ronreiter-meme-generator.p.rapidapi.com'
      }
    })
      .then(response => response.json())
      .then((newData) => {
        console.log(newData)
      })
  }

  useEffect(() => {
    fetchImages();
  }, []);

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
