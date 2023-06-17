import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

function Meme() {

  return (<> <Box
    rounded={"lg"}
    bg={useColorModeValue("white", "gray.700")}
    boxShadow={"lg"}
    pb="2%"
    minHeight="450px"
  ></Box></>)


}



export default Meme;