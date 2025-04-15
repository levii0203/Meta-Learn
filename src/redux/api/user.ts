import { createAsyncThunk } from "@reduxjs/toolkit";

interface UserData {
    email?:string,
    password?:string
}
interface User {
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: number;
    address?: string;
    id?: number;
    role?: string;
}

const SaveUser = createAsyncThunk<User,UserData>(
    'user/SaveUser',
    async (userData:UserData, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            const r = await res.json();
            if (!r.data?.meta) {
                throw new Error("Invalid response structure");
              }
            return r.data.meta;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export default SaveUser;