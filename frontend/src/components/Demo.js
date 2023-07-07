import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useWallet } from "fuels-react";
import { Heading, Center, Button, Flex, Spacer, Input, InputGroup, Stack, InputRightAddon, Badge, Text } from '@chakra-ui/react';
import { Logo } from '../Logo';
import Meme from './Meme';
import "../css/Meme.css";

function Demo() {
  const [memeArray, setMemeArray] = useState([]);
  const [memes, setMemes] = useState([]);

  const homescreen = async () => {
    let imagesToSet = await fetchImages()
    let memesToSet = await getMemes(imagesToSet)
    setMemeArray(imagesToSet)
  }
  homescreen()


  const getMemes = (meme) => {
    let fetched;
    return fetch('https://ronreiter-meme-generator.p.rapidapi.com/meme', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'ronreiter-meme-generator.p.rapidapi.com'
      },
      params: {
        top: '',
        bottom: '',
        meme,
      },
    })
      .then(response => response.json())
  }

  const memePromises = imagesToSet[0].map(image =>
    getMemes(image)
  );
  Promise.all(memePromises).then(data => { memesToSet(data) })






  const fetchImages = () => {
    let fetched;
    return fetch('https://ronreiter-meme-generator.p.rapidapi.com/images', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'ronreiter-meme-generator.p.rapidapi.com'
      }
    })
      .then(response => response.json())
      .then((newData) => {
        fetched = newData;
        return fetched;
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
