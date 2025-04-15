import { createAsyncThunk } from "@reduxjs/toolkit";
import { BrowserProvider, formatEther } from "ethers";

interface wallet {
    address?: string|null,
    balance?: string|null,
    avatar?: string|null,
}

export const connectWallet = createAsyncThunk<wallet>(
    'wallet/connectWallet',
    async (_, { rejectWithValue }) => {
      try {
        if (!window.ethereum) throw new Error('MetaMask is not installed');
        const provider = new BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        const ensName = await provider.lookupAddress(address);
        const avatar = await provider.getAvatar((ensName?ensName : ""));
        return {
            address,
            balance: formatEther(balance),
            avatar
        }
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
);