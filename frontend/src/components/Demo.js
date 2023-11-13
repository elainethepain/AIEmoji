import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import { useWallet } from "fuels-react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure, Button, Flex, Spacer, Spinner, Image, Box, Input, InputGroup, Stack, InputRightAddon, Badge, Text
} from '@chakra-ui/react';
import { Logo } from '../Logo';
import Meme from './Meme';
import "../css/Demo.css";

function Demo() {
  const [memeTitles, setMemeTitles] = useState([]);
  const [memes, setMemes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(false);
  const [selected, setSelected] = useState({});
  const [info, setInfo] = useState('');
  const wallet = useWallet();


  const fetchMemes = async () => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_BASE_ID}/${process.env.REACT_APP_TABLE}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_KEY}`
      },
    }).then(rs => rs).then(rs => rs.json()).then(
      ({ records }) => {
        let items = records.map(({ fields }) => fields)
        setMemes(items)
      })
  }

  const convert = async () => {
    setLoading(true)
    setAvailable(true)
    let memeStr = `${selected} as a sticker`
    let meme_info = fetch(`${memeStr}`);
    setInfo(meme_info);
    setLoading(false)
  }


  useEffect(() => {
    fetchMemes();
  }, []);


  return (
    <>
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
        <div className="demo_container">
          <Box className="searchbar" spacing={2}>
            <InputGroup>
              <Input type='text' placeholder='Search Memes' />
              <InputRightAddon children='Search' />
            </InputGroup>
          </Box>
          <div className="meme-container">
            {memes.length > 0 && memes.map((data) => {
              return <Meme modal={() => { setSelected({ ...data }) }} onOpen={onOpen} data={data} key={data.title} />;
            })}
          </div>
        </div>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`${selected.title}`}</ModalHeader>
          <Box maxW='sm' pb="2%" className='image_box'
            height="200px" width="200px" boxShadow={"lg"} rounded={"lg"} borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <div className='image_container'><Image src={selected.link} /></div>
          </Box>
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={convert}>Convert to Emoji</Button>
            {loading && <Spinner />}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            {available && <Button>Download</Button>}
            {available && <Button>Share</Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>



  );
}

export default Demo;
