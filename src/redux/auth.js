import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    token: JSON.parse(localStorage.getItem("token")) || null,
    isFenching: false,
    error: false
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRequest: (state,action)=>{

        },
        loginSuccess: (state,action)=>{
            state.token = action.payload;
            state.isFenching = false;
            state.error = false;
            localStorage.setItem("token", JSON.stringify(state.token))
        },
        loginFaild: (state,action)=>{
            state.token = null;
            state.isFenching = false;
            state.error = action.payload;
        }
    }
})


export const { loginRequest, loginSuccess, loginFaild} = userSlice.actions;
export default userSlice.reducer;