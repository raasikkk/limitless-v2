import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counterSlice/counterSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
    // middleware: (getDefaultMiddleware) => 
    //     getDefaultMiddleware().concat()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch