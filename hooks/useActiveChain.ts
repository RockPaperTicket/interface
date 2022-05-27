import {
  ADDRESSES,
  AvailableChains,
  ConnectedEventLogAddress,
} from './../utils/constants';
import { useMemo } from 'react';
import { useEthers } from '@usedapp/core';

export const useActiveChain = () => {
  const { chainId = 0, account } = useEthers();

  const { isActive, eventFactoryAddress, eventLogAddress } = useMemo(() => {
    if (chainId) {
      return {
        isActive: AvailableChains.includes(chainId),
        eventLogAddress: ADDRESSES.eventLog[chainId],
        eventFactoryAddress: ADDRESSES.eventFactory[chainId],
      };
    }
    return {
      isActive: false,
      eventLogAddress: ConnectedEventLogAddress,
      eventFactoryAddress: '0x',
    };
  }, [chainId]);

  return { isActive, chainId, eventFactoryAddress, eventLogAddress, account };
};
