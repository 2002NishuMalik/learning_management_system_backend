import { configureStore } from "@reduxjs/toolkit";
import authsliceReducer from "./slices/authslice";

const store = configureStore({
    reducer: {
       auth: authsliceReducer 
    },
    devTools: true
});

export default store;