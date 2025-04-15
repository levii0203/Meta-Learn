import { createSlice } from "@reduxjs/toolkit";

interface initial{
    errors:Array<any>,
    notify:Array<any>
}
const initialState:initial={
    errors:[],
    notify:[]
}
const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        addNotification: (state,action)=>{
            let newArr:Array<any> = [...state.notify,action.payload];
            state.notify =  newArr;
        },
        removeNotification: (state,action)=>{
            let newArr=[];
            for(let i=0;i<state.notify.length;i++){
                if(i!==action.payload){
                    newArr.push(state.notify[i]);
                }
            }
            state.notify = newArr;
        },
        
    }
})

export const { addNotification , removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;