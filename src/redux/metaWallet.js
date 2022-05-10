import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    walletid: JSON.parse(localStorage.getItem("walletid")) || null,
    isFenching: false,
    error: false
}

export const walletSlice = createSlice({
    name:"wallet",
    initialState,
    reducers:{
        walletconnect: (state,action)=>{
            state.walletid = action.payload;
            localStorage.setItem("walletid", JSON.stringify(state.walletid))

        },
        walletremove: (state,action)=>{
            state.walletid = null;
            state.isFenching = false;
            state.error = false;
            localStorage.setItem("walletid", JSON.stringify(state.walletid))
        }
    }
})


export const { walletconnect, walletremove} = walletSlice.actions;
export default walletSlice.reducer;