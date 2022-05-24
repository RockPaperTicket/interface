import { SimpleGrid, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Event from '../components/common/EventItem';
import { EventLog, EventLog__factory } from '../contracts/types';
import { ADDRESSES } from '../utils/constants';
import { ChainId } from '@usedapp/core';
import { ethers } from 'ethers';

const Home: NextPage = () => {
  const [events, setEvents] = useState<EventLog.EventStructOutput[]>([]);

  const callContract = async () => {
    const provider = new ethers.providers.InfuraProvider(
      'kovan',
      'b064d2610dcf4adfab4fa1fc9ee196b2'
    );

    const contract = EventLog__factory.connect(
      ADDRESSES.eventLog[ChainId.Kovan],
      provider
    );
    const events = await contract.getOpenEvents();
    setEvents(events);
  };

  useEffect(() => {
    callContract();
  }, []);

  return (
    <>
      {events.length ? (
        <SimpleGrid py={6} columns={[1, 2, 3, 4]} gap={6}>
          {events.map((item, index) => (
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
