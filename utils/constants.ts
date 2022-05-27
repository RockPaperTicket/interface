import { ChainId } from '@usedapp/core';

export type AddressMap = { [chainId: number]: string };

export const ADDRESSES: {
  eventLog: AddressMap;
  eventFactory: AddressMap;
  mintTicket: AddressMap;
} = {
  eventLog: {
    [ChainId.Rinkeby]: '0xDB5EceA46F02904fd9B900e36e4BAD5414F78b21',
    [ChainId.Kovan]: '0x2c147C1F9C8d0feA09385983822b41Eb7df881b7',
    [ChainId.Mumbai]: '0x38eB08405258Eff41DBA4d872cf0C8322536b89a',
  },
  eventFactory: {
    [ChainId.Rinkeby]: '0x45E80664E95C77EF3f8830bab98D08af08e4fc55',
    [ChainId.Kovan]: '0x91a633f1c5a949252D4C09a302E8F4342Af73C1a',
    [ChainId.Mumbai]: '0xd70333EdA9b282d715B15Fb20B4D1F73924De4B6',
  },
  mintTicket: {
    [ChainId.Rinkeby]: '0x674b3C234422b00E0a44166E2921F38F2415065c',
  },
};

export const AvailableChains = [ChainId.Rinkeby];

export const ConnectToNetwork = 'rinkeby';

export const ConnectedEventLogAddress = ADDRESSES.eventLog[ChainId.Rinkeby];
