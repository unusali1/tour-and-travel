import { apiSlice } from "../api/apiSlice";

export const hotelsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHotels: builder.query({
            query: () => `/hotels`,
        }),
        getHotelDetail:builder.query({
            query:(id)=>`/rooms/${id}`
        })
    }),
});

export const { useGetHotelsQuery,useGetHotelDetailQuery } = hotelsApi;
