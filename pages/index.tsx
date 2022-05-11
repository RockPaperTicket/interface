import { SimpleGrid } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Event from '../components/common/EventItem';
import Landing from '../components/Landing';

const Home: NextPage = () => {
  return (
    <>
      <Landing></Landing>
      <SimpleGrid py={6} columns={[1, 2, 3, 4]} gap={6}>
        {Array.from(new Array(10)).map((item, index) => (
          <Event
            key={index}
            name="New event"
            description="some sdioeijo"
            mintingDate={new Date()}
            numberOfTickets={100}
            price={20}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Home;
