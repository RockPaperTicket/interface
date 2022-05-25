import type { AppProps } from 'next/app';
import { Box, ChakraProvider, Container } from '@chakra-ui/react';
import '../styles/globals.css';
import { theme } from '../utils/theme';
import { Navbar } from '../components/Navbar';
import { ChainId, Config, DAppProvider, useEthers } from '@usedapp/core';
import { AlertProvider } from '../context/alert';
import Head from 'next/head';
import { useEffect } from 'react';
import { EventLog, EventLog__factory } from '../contracts/types';
import { ADDRESSES } from '../utils/constants';
import { ethers } from 'ethers';
import _ from 'lodash';
import { useEventLogs } from '../hooks/useEventLogs';
import { useSolidityEvents } from '../hooks/useSolidityEvents';

declare global {
  interface Window {
    ethereum: any;
  }
}

const config: Config = {
  readOnlyChainId: ChainId.Rinkeby,
};

function MyApp({ Component, pageProps }: AppProps) {
  const { registeredEvents } = useEventLogs();
  const { setEventNotifications } = useSolidityEvents();
  const { account } = useEthers();

  const gameStartedEventFilters = async (contract: EventLog) => {
    const filter = contract.filters.GameStarted();
    const events = await contract.queryFilter(filter);
    events.reverse();

    const notifications: EventLog.EventStructOutput[] = [];
    events.forEach((event) => {
      const _gameAddress = event.args.gameAddress;
      const notification = _.find(
        registeredEvents,
        (u) => u.eventGameAddress === _gameAddress
      );
      if (notification) {
        notifications.push(notification);
      }
    });
    setEventNotifications(notifications);
  };

  const callContract = async () => {
    const provider = new ethers.providers.InfuraProvider(
      'kovan',
      process.env.NEXT_PUBLIC_INFURA_KEY
    );

    const contract = EventLog__factory.connect(
      ADDRESSES.eventLog[ChainId.Kovan],
      provider
    );
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
        <AlertProvider>
          <Navbar />
          <Box h={20} />
          <Container as="main" maxW="container.xl">
            <Component {...pageProps} />
          </Container>
        </AlertProvider>
      </ChakraProvider>
    </DAppProvider>
  );
}

export default MyApp;
