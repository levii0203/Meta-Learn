import { createSlice } from "@reduxjs/toolkit";


interface componentInterface{
    active:string;
}

const initialState:componentInterface = {
    active:"StudentDashboard"
}

const componentSlice = createSlice({
    name:'component',
    initialState,
    reducers:{
        setComponent: (state,action)=>{
            state.active = action.payload;
        }
    }
})
export const {setComponent} = componentSlice.actions;
export default componentSlice.reducer;