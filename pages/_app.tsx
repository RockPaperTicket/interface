import type { AppProps } from 'next/app';
import { Box, ChakraProvider, Container } from '@chakra-ui/react';
import '../styles/globals.css';
import { theme } from '../utils/theme';
import { Navbar } from '../components/Navbar';
import { ChainId, Config, DAppProvider, useEthers } from '@usedapp/core';
import Head from 'next/head';
import { useEffect } from 'react';
import { EventLog, EventLog__factory } from '../contracts/types';
import { ConnectedEventLogAddress } from '../utils/constants';
import _ from 'lodash';
import { useEventLogs } from '../hooks/useEventLogs';
import {
  NotificationWithTime,
  useSolidityEvents,
} from '../hooks/useSolidityEvents';
import { convertTimestamp } from '../utils/helpers';
import CustomAlert from '../components/Alert';
import { getAlchemyProvider } from '../utils/contract/connectors';

declare global {
  interface Window {
    ethereum: any;
  }
}

const config: Config = {
  readOnlyChainId: ChainId.Rinkeby,
};

function MyApp({ Component, pageProps }: AppProps) {
  const { registeredEvents, setRegisteredEvents } = useEventLogs();
  const { setEventNotifications } = useSolidityEvents();
  const { account } = useEthers();

  const gameStartedEventFilters = async (contract: EventLog) => {
    const filter = contract.filters.GameStarted();
    const events = await contract.queryFilter(filter);
    events.reverse();

    const notifications: NotificationWithTime[] = [];
    events.forEach((event) => {
      const _gameAddress = event.args.gameAddress;

      const notification = _.find(
        registeredEvents,
        (u) => u.eventGameAddress === _gameAddress
      );
      if (notification) {
        notifications.push({
          event: notification,
          timeStarted: convertTimestamp(event.args.timeStarted.toString()),
        });
      }
    });
    setEventNotifications(notifications);
  };

  const callContract = async () => {
    const provider = getAlchemyProvider();

    const contract = EventLog__factory.connect(
      ConnectedEventLogAddress,
      provider
    );
    if (!registeredEvents.length && account) {
      const registeredEvents = await contract.getRegisteredEvents(account);
      setRegisteredEvents(registeredEvents);
    }
    contract.on('GameStarted', (gameAddress: any, owner: any) => {
      console.log(gameAddress, owner);
      gameStartedEventFilters(contract);
    });
    gameStartedEventFilters(contract);
  };

  useEffect(() => {
    callContract();
  }, [registeredEvents, account]);

  return (
    <DAppProvider config={config}>
      <Head>
        <title>RPT</title>
      </Head>
      <ChakraProvider theme={theme}>
        <CustomAlert />
        <Navbar />
        <Box h={20} />
        <Container as="main" maxW="container.xl">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </DAppProvider>
  );
}

export default MyApp;
