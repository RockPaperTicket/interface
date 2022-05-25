import { Box, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { ConnectWalletButton } from './ConnectWalletButton';
import Notification from './Notification';

const links = [
  {
    url: '',
    text: 'Home',
  },
  {
    url: 'profile',
    text: 'Profile',
  },
  {
    url: 'create',
    text: 'Create Event',
  },
];

export const Navbar: FunctionComponent = () => {
  const { account } = useEthers();

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
            <Link href="/">RockPaperTicket</Link>
          </HStack>
          {account && (
            <Flex gap={4}>
              {links.map((link, index) => (
                <Box key={index}>
                  <Link href={`/${link.url}`}>{link.text}</Link>
                </Box>
              ))}
            </Flex>
          )}
          <Flex gap={4} alignItems={'center'}>
            <Notification />
            <ConnectWalletButton />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
