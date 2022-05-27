import { ethers } from 'ethers';
import { ConnectToNetwork } from '../constants';

export const getAlchemyProvider = () => {
  return new ethers.providers.AlchemyProvider(
    ConnectToNetwork,
    process.env.NEXT_PUBLIC_INFURA_KEY
  );
};
