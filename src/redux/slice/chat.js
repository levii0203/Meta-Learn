import { createSlice } from "@reduxjs/toolkit";


const initialState= {
    userPrompt: null,
    promptResponse: [],
    download:[],
    refresh: null,
    sent:false,
}

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers: {
        setUserPrompt: (state,action)=>{
            state.userPrompt = action.payload;
        },
        setRefresh: (state,action)=>{
            state.refresh = action.payload;
        },
        addPrompt: (state,action)=>{
            state.promptResponse.push(action.payload);
        },
        setSent: (state,action)=>{
            state.sent = action.payload;
        },
    }
})

export const { setUserPrompt , setRefresh , addPrompt , setSent } = chatSlice.actions;
export default chatSlice.reducer;