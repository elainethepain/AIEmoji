import React from 'react';
import { Box, useColorModeValue, Image } from '@chakra-ui/react';

function Meme(item) {

  return (<>
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={item} />
    </Box>
    <Box p='6'
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      pb="2%"
      minHeight="450px"
    ></Box></>)


}



export default Meme;