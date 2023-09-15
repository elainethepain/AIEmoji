import React from 'react';
import { Box, useColorModeValue, Image } from '@chakra-ui/react';
import "../css/Meme.css";

function Meme({ data: { title, link } }) {

  return (<>
    <Box maxW='sm' pb="2%" className='image_box'
      height="200px" width="200px" boxShadow={"lg"} rounded={"lg"} borderWidth='1px' borderRadius='lg' overflow='hidden'>
      {link && <div className='image_container'><Image src={link} /></div>}
    </Box>
  </>)
}

export default Meme;
