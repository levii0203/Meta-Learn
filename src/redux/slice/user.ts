import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { connectWallet } from "../api/wallet";
import SaveUser from "../api/user";

interface userInterface {
    firstName?:string,
    lastName?:string,
    email?:string,
    age?:number,
    address?:string,
    id?:number,
    role?:string
}

const initialState:userInterface = {
    firstName:undefined,
    lastName:undefined,
    email:undefined,
    age:undefined,
    address:undefined,
    id:undefined,
    role:undefined
}
const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers:{

    },
    extraReducers: (builder)=>{
        builder
            .addCase(SaveUser.pending,(state)=>{
                state.firstName=undefined;
                state.lastName=undefined;
                state.email=undefined;
                state.age=undefined;
                state.address=undefined;
                state.id=undefined;
                state.role=undefined;
            })
            .addCase(SaveUser.fulfilled,(state,action)=>{
                state.firstName=action.payload.firstname;
                state.lastName=action.payload.lastname;
                state.email=action.payload.email;
                state.age=action.payload.age;
                state.address=action.payload.address;
                state.id=action.payload.id;
                state.role=action.payload.role;
            })
    }
})

export const {} = UserSlice.actions;
export default UserSlice.reducer;