import React from 'react';
import { Link } from "react-router-dom"
import { whitelistAbi } from "../contracts/whitelistabi";
import { useWallet, useContract } from "fuels-react";
import { useState } from "react";
import { Heading, Center, Button, Flex, Spacer, Box, Image, Stack, Divider, Badge, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
import "../css/Demo.css";

function Demo() {
  const wallet = useWallet();
  return (
    <>  <Flex className="nav_container">
      <h1 class="word_logo"><span data-text-fill="true" class="word_logo">
        <Link to="/Home">AI EMOJI</Link>
      </span>
      </h1>
      <Spacer />
      {wallet.isConnected ? (
        <Button className="fuel_network" size='md' onClick={wallet.disconnect}>Disconnect</Button>

      ) : (
        <Button className="fuel_network" size='md' onClick={wallet.connect}>Connect to Fuel Network</Button>
      )}

    </Flex>
    </>
  );
}

export default Demo;
