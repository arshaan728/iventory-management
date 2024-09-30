import { createSlice , PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
    isSidebarCollpased:boolean;
    isDarkMode:boolean;
}

const initialState : InitialStateTypes= {
    isSidebarCollpased : false,
    isDarkMode : false,
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsSidebarCollapsed:(state, action:PayloadAction<boolean>) =>{
            state.isSidebarCollpased = action.payload;
        },
        setIsDarkMode : (state , action: PayloadAction<boolean>) =>{
            state.isDarkMode = action.payload;
        },
    },
});

export const { setIsSidebarCollapsed , setIsDarkMode} = globalSlice.actions;

export default globalSlice.reducer;