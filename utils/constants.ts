import { ChainId } from '@usedapp/core';

export type AddressMap = { [chainId: number]: string };

export const ADDRESSES: {
  eventLog: AddressMap;
  eventFactory: AddressMap;
} = {
  eventLog: {
    [ChainId.Rinkeby]: '0x60245FcBC8269034C354805b96a2029CcE8F9464',
    [ChainId.Kovan]: '0x8cd84e12b10770937Cb8C8C3Eb1A45791BF60F56',
  },
  eventFactory: {
    [ChainId.Rinkeby]: '0x165f47c6dB9432A6DbBbee91d679189096173288',
    [ChainId.Kovan]: '0xE4bE28AD53F21608bE1a9B23C815F902B83324FA',
  },
};

export const AvailableChains = [ChainId.Kovan];
