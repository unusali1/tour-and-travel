import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://backend.dayfuna.com/api",
        prepareHeaders: async (headers, { getState, endpoint }) => {
            const token = getState()?.auth?.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes:[],
    endpoints: (builder) =>({}), 
})