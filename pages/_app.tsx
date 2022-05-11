import type { AppProps } from 'next/app';
import { Box, ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { theme } from '../utils/theme';
import { Navbar } from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Box h={20} />
      <main>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}

export default MyApp;
