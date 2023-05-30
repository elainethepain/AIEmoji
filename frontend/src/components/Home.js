import React from 'react';
import { Route, Routes, Link } from "react-router-dom"
import { whitelistAbi } from "../contracts/whitelistabi";
import { useWallet, useContract } from "fuels-react";
import { useState } from "react";
import {
  ChakraProvider,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { Heading, Center, Button, Flex, Spacer, Box, Image, Stack, Divider, Badge, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
import "../css/Home.css";

function Home() {
  const wallet = useWallet();

  const [loading, setLoading] = useState(false);
  const [listName, setListName] = useState("");
  const [rsvpConfirmed, setRSVPConfirmed] = useState(false);
  const [numOfRSVPs, setNumOfRSVPs] = useState(0);
  const [listId, setListId] = useState(0);


  const contract = useContract({
    address:
      "0xa20edc3a1a76a2c67f453c9a26ebf870b14e3a562e8dad3efd225a5854a3e246",
    abi: whitelistAbi,
  });

  async function joinWhitelist() {
    setLoading(true);
    try {
      console.log("RSVPing to list");
      // Create a transaction to RSVP to the whitelist
      const { value: listRSVP, transactionId } = await contract.functions
        .rsvp(listId)
        .txParams({ gasPrice: 1, variableOutputs: 1 })
        .call();

      console.log(
        "Transaction created",
        transactionId,
        `https://fuellabs.github.io/block-explorer-v2/transaction/${transactionId}`
      );
      console.log("# of RSVPs", listRSVP.num_of_rsvps.toString());
      setNumOfRSVPs(listRSVP.num_of_rsvps.toNumber());
      setRSVPConfirmed(true);
      alert("rsvp successful");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Center className="container">
        <Flex className="nav_container">
          <h1 class="word_logo"><span data-text-fill="true" class="word_logo">
            AI EMOJI
          </span>
          </h1>
          <Spacer />
          <Text className="word_logo demo_text" size='md'>
            <Link to="/Demo"><span data-text-fill="true" class="word_logo">
              Demo
            </span>
            </Link>
          </Text>
          {wallet.isConnected ? (
            <Button className="fuel_network" size='md' onClick={wallet.disconnect}>Disconnect</Button>

          ) : (
            <Button className="fuel_network" size='md' onClick={wallet.connect}>Connect to Fuel Network</Button>
          )}

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
            <Button className="signup_button" onClick={joinWhitelist} colorScheme='purple' size='md'>
              Signup for Beta
            </Button>
          </Stack>
        </Stack>
      </Center>
    </ChakraProvider >
  );
}

export default Home;
