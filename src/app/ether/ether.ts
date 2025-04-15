import { ethers } from 'ethers';

export const getProvider = () => {
  return new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/gyx6TxPgmtzo3XHqN5c6Y7ud_WLxdu_T`);
};

export const getSigner = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider.getSigner();
  }
  throw new Error('No wallet detected');
};