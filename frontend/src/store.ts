import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice
    },
    // middleware: (getDefaultMiddleware) => 
    //     getDefaultMiddleware().concat()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch