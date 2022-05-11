import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Event from '../components/common/EventItem';

const Profile: NextPage = () => {
  return (
    <>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>My Events</Tab>
          <Tab>Created Events</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={[1, 2, 3, 4]} gap={6}>
              {Array.from(new Array(6)).map((item, index) => (
                <Event
                  key={index}
                  name="New event"
                  description="some sdioeijo"
                  mintingDate={new Date()}
                  numberOfTickets={100}
                  price={20}
                  registered
                />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, 2, 3, 4]} gap={6}>
              {Array.from(new Array(3)).map((item, index) => (
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Profile;
