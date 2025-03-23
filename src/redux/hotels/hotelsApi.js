import { apiSlice } from "../api/apiSlice";

export const hotelsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHotels: builder.query({
            query: () => ({
                url:"/hotels",
                method:"GET"
            }),
        }),
        getHotelDetail:builder.query({
            query:(slug)=> ({
                url:`/rooms/${slug}`,
                method:"GET"
            })
        }),
        hotelSearch: builder.mutation({
            query:(data)=>({
                url:"/search-rooms",
                method:"POST",
                body:data
            })
        })
    }),
});

export const { useGetHotelsQuery,useGetHotelDetailQuery,useHotelSearchMutation} = hotelsApi;
