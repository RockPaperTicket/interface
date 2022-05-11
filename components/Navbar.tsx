import { Box, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { ConnectWalletButton } from './ConnectWalletButton';

export const Navbar: FunctionComponent = () => {
  return (
    <>
      <Box
        px={4}
        as="nav"
        position="fixed"
        top="0"
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        bg={useColorModeValue('gray.200', 'blackAlpha.900')}
        w="full"
        zIndex={1000}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Link href="/">Chainlink Hackathon (name TBD)</Link>
          </HStack>
          <Flex alignItems={'center'}>
            <ConnectWalletButton></ConnectWalletButton>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
