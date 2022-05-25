import { ChainId } from '@usedapp/core';

export type AddressMap = { [chainId: number]: string };

export const ADDRESSES: {
  eventLog: AddressMap;
  eventFactory: AddressMap;
} = {
  eventLog: {
    [ChainId.Rinkeby]: '0x60245FcBC8269034C354805b96a2029CcE8F9464',
    [ChainId.Kovan]: '0xDD65Cf1280C52A825B4997bC10E3ad688F6Feab3',
  },
  eventFactory: {
    [ChainId.Rinkeby]: '0x165f47c6dB9432A6DbBbee91d679189096173288',
    [ChainId.Kovan]: '0x8968d23FB3D852cB110BF6c38cbfCE299BE757FD',
  },
};

export const AvailableChains = [ChainId.Kovan];
