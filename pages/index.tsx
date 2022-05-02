import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Landing from '../components/Landing';

const Home: NextPage = () => {
  return (
    <Box>
      <Landing></Landing>
    </Box>
  );
};

export default Home;
