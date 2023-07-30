import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useWallet } from "fuels-react";
import { SimpleGrid, VStack, HStack, Image, Center, Box, Button, Flex, Spacer, Input, InputGroup, Stack, InputRightAddon, Badge, Text } from '@chakra-ui/react';
import { Logo } from '../Logo';
import Meme from './Meme';
import { testImages } from "../utils/test-images";
import "../css/Meme.css";

function Demo() {
  const [images, setImages] = useState([]);
  const [memes, setMemes] = useState([]);

  const wallet = useWallet();


  const getMemes = async () => {
    let imagesToSet = await fetchImages()
    // await fetchMemes(imagesToSet[0])
  }

  const fetchMemes = (meme) => {
    console.log(meme)
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
      .then((response) => response.blob()).then(blob => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          let base64data = reader.result;
          console.log(base64data);
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

  // .then((newData) => {
  //   console.log('response from api', newData)
  //   fetched = newData;
  //   return fetched;
  // })


  // const memePromises = (array_of_images) => {
  //   fetchMemes(array_of_images[0])

  //   let array_of_promises = array_of_images.slice(0, 100).map(image => {
  //     console.log(image)
  //     return fetchMemes(image)
  //   }
  //   );

  //   return Promise.all(array_of_promises).then(data => {
  //     console.log(data)
  //     return data
  //   })
  // }


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
    getMemes();
  });


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
              {testImages.map((data) => {
                return <Meme item={data} />;
              })}
            </HStack>
          </Stack>
        </Stack>
      </Center>
    </>
  );
}

export default Demo;
