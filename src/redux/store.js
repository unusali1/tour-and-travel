import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../redux/api/apiSlice";
import authSliceReducer from "../redux/auth/authSlice";
import hotelsSliceReducer from "../redux/hotels/hotelsSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        hotels: hotelsSliceReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware),
});
