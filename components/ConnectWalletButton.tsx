import Button from './common/Button';
import { FunctionComponent } from 'react';
import { shortenIfAddress, useEthers } from '@usedapp/core';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import Link from 'next/link';

const links = [
  {
    url: 'profile',
    text: 'Profile',
  },
  {
    url: 'create',
    text: 'Create Event',
  },
];

export const ConnectWalletButton: FunctionComponent = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();

  if (!account) {
    return <Button onClick={() => activateBrowserWallet()}>Connect</Button>;
  }

  return (
    <Menu>
      <MenuButton bg="gray.600" px={5} py={2} borderRadius="full">
        {shortenIfAddress(account)}
      </MenuButton>
      <MenuList>
        {links.map((link, index) => (
          <MenuItem key={index}>
            <Link href={`/${link.url}`}>{link.text}</Link>
          </MenuItem>
        ))}
        <MenuItem onClick={deactivate}>Disconnect</MenuItem>
      </MenuList>
    </Menu>
  );
};
