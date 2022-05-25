import {
  Box,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import Button from '../components/common/Button';
import Event from '../components/common/EventItem';
import { EventLog__factory } from '../contracts/types';
import { useActiveChain } from '../hooks/useActiveChain';
import { useEventLogs } from '../hooks/useEventLogs';

const Profile: NextPage = () => {
  const {
    registeredEvents,
    setRegisteredEvents,
    createdEvents,
    setCreatedEvents,
  } = useEventLogs();
  const { eventLogAddress, isActive, account } = useActiveChain();

  const callContract = async () => {
    if (!account || !isActive) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = EventLog__factory.connect(eventLogAddress, provider);
    const createdEvents = await contract.getCreatedEvents(account);
    setCreatedEvents(createdEvents);
    const registeredEvents = await contract.getRegisteredEvents(account);
    setRegisteredEvents(registeredEvents);
  };

  useEffect(() => {
    callContract();
  }, [isActive, account]);

  return (
    <>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>My Events</Tab>
          <Tab>Created Events</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {registeredEvents.length ? (
              <SimpleGrid columns={[1, 2, 3, 4]} gap={6}>
                {registeredEvents.map((item, index) => (
                  <Box key={index}>
                    <Event registered {...item} />
                    {item.status === 1 && (
                      <Button w="full" mt={4}>
                        <Link href={`/${item.eventGameAddress}`}>
                          Play game
                        </Link>
                      </Button>
                    )}
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Text>No items found</Text>
            )}
          </TabPanel>
          <TabPanel>
            {createdEvents.length ? (
              <SimpleGrid columns={[1, 2, 3, 4]} gap={6}>
                {createdEvents.map((item, index) => (
                  <Event key={index} created {...item} />
                ))}
              </SimpleGrid>
            ) : (
              <Text>No items found</Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Profile;
