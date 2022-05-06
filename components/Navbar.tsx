import { Box, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { ConnectWalletButton } from './ConnectWalletButton';

export const Navbar: FunctionComponent = () => {
  return (
    <>
      <Box px={4}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
        >
          <HStack spacing={8} alignItems={'center'}>
            <Box>Chainlink Hackathon (name TBD)</Box>
          </HStack>
          <Flex alignItems={'center'}>
            <ConnectWalletButton></ConnectWalletButton>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
