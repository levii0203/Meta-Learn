import { createSlice } from "@reduxjs/toolkit";

interface meta{
    courses:Array<any>,
    myCourses:Array<any>,
    certCourses:Array<any>,
    cert_meta:Array<any>,
    currTitle:string|null,
    currCourseId:number|null,
}

const initialState:meta = {
    courses:[],
    myCourses:[],
    certCourses:[],
    cert_meta:[],
    currTitle:null,
    currCourseId:null,
}

const metaSlice = createSlice({
    name:'meta',
    initialState,
    reducers:{
        setCourses: (state,action)=>{
            state.courses = action.payload;
        },
        setCurrTitle: (state,action)=>{
            state.currTitle = action.payload;
        },
        setCurrCourseId: (state,action)=>{
            state.currCourseId = action.payload;
        },
        setMyCourses: (state,action)=>{
            state.myCourses = action.payload;
        },
        setCertCourses: (state,action)=>{
            state.certCourses = action.payload;
        },
        setCertMeta: (state,action)=>{
            state.cert_meta = action.payload;
        }
    }
})
export const {setCourses, setCurrTitle, setCurrCourseId , setMyCourses , setCertCourses , setCertMeta} = metaSlice.actions;
export default metaSlice.reducer;