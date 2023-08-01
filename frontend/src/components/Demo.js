import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom"
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


  const fetch_meme_title_array = () => {
    let fetched;
    console.log("calling...")
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

  const fetchMemes = (meme) => {
    console.log(meme)
    let fetched;
    // const params = new URLSearchParams({
    // })
    return fetch(`https://ronreiter-meme-generator.p.rapidapi.com/${meme}`, {
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
      .then((response) => response.blob()).then(blob => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          let base64data = reader.result;
          // console.log(base64data);
          console.log("called 1x")
          fetched = base64data;
          setMemes({ meme: fetched })
          return fetched;
        }
      })
      // .then((blob) => URL.createObjectURL(blob))
      // .then((url) => {
      //   fetched = url;
      //   console.log(fetched);
      //   return fetched;
      // })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    const getMemes = async () => {
      let titles = await fetch_meme_title_array();
      // titles.map(title => fetchMemes(title))
      await setMemeTitles(titles);
      let meme = await fetchMemes(titles[0])
      setMemes(meme);
    }
    getMemes();
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
              {memes && Object.values(memes).map((data) => {
                return <Meme item={data} key={data.slice(30)} />;
              })}
            </HStack>
          </Stack>
        </Stack>
      </Center>
    </>
  );
}

export default Demo;
