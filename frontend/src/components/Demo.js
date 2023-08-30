import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import { useWallet } from "fuels-react";
import { SimpleGrid, VStack, HStack, Image, Center, Box, Button, Flex, Spacer, Input, InputGroup, Stack, InputRightAddon, Badge, Text } from '@chakra-ui/react';
import { Logo } from '../Logo';
import Meme from './Meme';
import { testImages } from "../utils/test-images";
import "../css/Meme.css";

function Demo() {
  const [memeTitles, setMemeTitles] = useState([]);
  const [memes, setMemes] = useState([]);
  const wallet = useWallet();


  const fetchMemes = async () => {
    let fetched = [];
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_BASE_ID}/${process.env.REACT_APP_TABLE}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_KEY}`
      },
    }).then(rs => rs).then(rs => rs.json()).then(
      ({ records }) => {
        let items = records.map(({ fields }) => fields)
        console.log(items)
        fetched = items
        setMemes(fetched)
      })
  }

  useEffect(() => {
    fetchMemes();
  }, []);


  return (
    <>
      <Center className="container">
        <Flex as="nav" boxShadow="sm" className="nav_container">
          <h1 className="word_logo"><span data-text-fill="true" className="word_logo">
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

        <Stack className='middle'>
          <Stack className="searchbar" spacing={2}>
            <InputGroup>
              <Input type='text' placeholder='Search Memes' />
              <InputRightAddon children='.com' />
            </InputGroup>
            <HStack className="meme-container">
              {memes && memes.map((data) => {
                return <Meme item={data} key={data.item} />;
              })}
            </HStack>
          </Stack>
        </Stack>
      </Center>
    </>
  );
}

export default Demo;
