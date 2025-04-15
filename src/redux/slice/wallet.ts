
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { connectWallet } from "../api/wallet";

interface Wallet {
    address?: string|null,
    balance?: string|null,
    avatar?:string|null
}

const initialState: Wallet = {
    address: null,
    balance: null,
    avatar: null
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<string | null>) => {
            state.address = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(connectWallet.pending,(state)=>{
                state.address = null;
                state.balance = null;
                state.avatar = null;
            })
            .addCase(connectWallet.fulfilled,(state, action)=>{
                state.address = action.payload.address;
                state.balance = action.payload.balance;
                state.avatar = action.payload.avatar;
            })
            .addCase(connectWallet.rejected, (state, action) => {
                console.error("Wallet connection failed:", action.payload);
            });
    }
});


export const {setAddress} = walletSlice.actions;
export default walletSlice.reducer;