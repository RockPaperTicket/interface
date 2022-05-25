import Button from '../common/Button';
import { FunctionComponent } from 'react';
import { shortenIfAddress, useEthers } from '@usedapp/core';
import { Flex, Tag } from '@chakra-ui/react';

export const ConnectWalletButton: FunctionComponent = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();

  if (!account) {
    return <Button onClick={activateBrowserWallet}>Connect</Button>;
  }

  return (
    <Flex gap={3}>
      <Tag>{shortenIfAddress(account)}</Tag>
      <Button variant="danger" onClick={deactivate}>
        Disconnect
      </Button>
    </Flex>
  );
};
