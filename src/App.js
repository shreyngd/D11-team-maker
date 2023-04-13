import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Flex,
} from '@chakra-ui/react';

import { MatchBox } from './Components/Match';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
          <Flex>
            <MatchBox/>
          </Flex>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
