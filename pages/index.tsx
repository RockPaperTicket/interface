import { SimpleGrid, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import Event from '../components/common/EventItem';
import { EventLog__factory } from '../contracts/types';
import { ADDRESSES } from '../utils/constants';
import { ChainId } from '@usedapp/core';
import { ethers } from 'ethers';
import { useEventLogs } from '../hooks/useEventLogs';

const Home: NextPage = () => {
  const { openEvents, setOpenEvents } = useEventLogs();

  const callContract = async () => {
    const provider = new ethers.providers.InfuraProvider(
      'kovan',
      process.env.NEXT_PUBLIC_INFURA_KEY
    );

    const contract = EventLog__factory.connect(
      ADDRESSES.eventLog[ChainId.Kovan],
      provider
    );
    const events = await contract.getOpenEvents();
    setOpenEvents(events);
  };

  useEffect(() => {
    callContract();
  }, []);

  return (
    <>
      {openEvents.length ? (
        <SimpleGrid py={6} columns={[1, 2, 3, 4]} gap={6}>
          {openEvents.map((item, index) => (
            <Event key={index} {...item} />
          ))}
        </SimpleGrid>
      ) : (
        <Text>No items found</Text>
      )}
    </>
  );
};

export default Home;
