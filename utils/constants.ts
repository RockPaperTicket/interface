import { ChainId } from '@usedapp/core';

export type AddressMap = { [chainId: number]: string };

export const ADDRESSES: {
  eventLog: AddressMap;
  eventFactory: AddressMap;
} = {
  eventLog: {
    [ChainId.Rinkeby]: '0x60245FcBC8269034C354805b96a2029CcE8F9464',
    [ChainId.Kovan]: '0x196844A55787e831C55Fda1984CadD0135091Aa5',
  },
  eventFactory: {
    [ChainId.Rinkeby]: '0x165f47c6dB9432A6DbBbee91d679189096173288',
    [ChainId.Kovan]: '0x825C8Dd83478D0015BB0A37Aa85e6B7D07cB25DA',
  },
};

export const AvailableChains = [ChainId.Kovan];
