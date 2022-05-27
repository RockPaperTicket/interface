import { SimpleGrid, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import Event from '../components/common/EventItem';
import { EventLog__factory } from '../contracts/types';
import { ConnectedEventLogAddress } from '../utils/constants';
import { useEventLogs } from '../hooks/useEventLogs';
import { getAlchemyProvider } from '../utils/contract/connectors';

const Home: NextPage = () => {
  const { openEvents, setOpenEvents } = useEventLogs();

  const callContract = async () => {
    const provider = getAlchemyProvider();

    try {
      const contract = EventLog__factory.connect(
        ConnectedEventLogAddress,
        provider
      );
      const events = await contract.getOpenEvents();
      setOpenEvents(events);
    } catch (error) {
      console.log(error);
    }
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
