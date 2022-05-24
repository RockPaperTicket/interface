import type { AppProps } from 'next/app';
import { Box, ChakraProvider, Container } from '@chakra-ui/react';
import '../styles/globals.css';
import { theme } from '../utils/theme';
import { Navbar } from '../components/Navbar';
import { ChainId, Config, DAppProvider } from '@usedapp/core';
import { AlertProvider } from '../context/alert';
import Head from 'next/head';

declare global {
  interface Window {
    ethereum: any;
  }
}

const config: Config = {
  readOnlyChainId: ChainId.Rinkeby,
};

function MyApp({ Component, pageProps }: AppProps) {
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
