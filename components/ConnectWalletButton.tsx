import { Button } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { FunctionComponent, useState } from 'react';

declare let window: any;

export const ConnectWalletButton: FunctionComponent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        setIsConnected(true);
        setUserAddress(await provider.getSigner().getAddress());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  };

  return (
    <Button onClick={() => connect()}>
      {isConnected ? userAddress : 'Connect'}
    </Button>
  );
};
