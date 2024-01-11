import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    error:null,
    load:null
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.load = true;
        },
        signInSuccess:(state,action) => {
            state.currentUser = action.payload;
            state.load = false;
            state.error = null;
        },
        signInFailure:(state,action)=>{
            state.error = action.payload;
            state.load = false;
        }
    }
});

export const {signInStart,signInSuccess,signInFailure} = userSlice.actions;

export default userSlice.reducer;