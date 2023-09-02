import React from 'react';
import { Box, useColorModeValue, Image } from '@chakra-ui/react';

function Meme({ data: { title, link } }) {
  console.log(title, link)
  return (<>
    <Box maxW='sm' pb="2%"
      height="100px" width="100px" boxShadow={"lg"} rounded={"lg"} borderWidth='1px' borderRadius='lg' overflow='hidden'>
      {link && <div className='image_container'><Image src={link} /></div>}
    </Box>
  </>)
}

export default Meme;
