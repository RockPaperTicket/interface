import { Container, SimpleGrid } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Event from '../components/common/EventItem';
import Landing from '../components/Landing';

const Home: NextPage = () => {
  return (
    <Container maxW="container.xl">
      <Landing></Landing>
      <SimpleGrid templateColumns="repeat(5, 1fr)" gap={6}>
        <Event
          name="New event"
          description="some sdioeijo"
          mintingDate={new Date()}
          numberOfTickets={100}
          price={20}
        />
      </SimpleGrid>
    </Container>
  );
};

export default Home;
