import { apiSlice } from "../api/apiSlice";

export const hotelsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHotels: builder.query({
            query: () => ({
                url: "/hotels",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))?.token || ""}`,
                },
            }),
        }),
        getHotelDetail: builder.query({
            query: (slug) => ({
                url: `/rooms/${slug}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))?.token || ""}`,
                },
            }),
        }),
        hotelSearch: builder.mutation({
            query: (data) => ({
                url: "/search-rooms",
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))?.token || ""}`,
                },
            }),
        }),
        hotelBook: builder.mutation({
            query: (data) => {
                const localAuth = localStorage.getItem("auth");
                const auth = localAuth ? JSON.parse(localAuth) : null;
                return {
                    url: "/book-room",
                    method: "POST",
                    body: data,
                    headers: {
                        Authorization: `Bearer ${auth?.token || ""}`,
                    },
                };
            },
        }),
        myBooking: builder.query({
            query: (data) => {
                const localAuth = localStorage.getItem("auth");
                const auth = localAuth ? JSON.parse(localAuth) : null;
                return {
                    url: "/my-bookings",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${auth?.token || ""}`,
                    },
                };
            },
        }),
    }),
});

export const { 
    useGetHotelsQuery,
    useGetHotelDetailQuery,
    useHotelSearchMutation,
    useHotelBookMutation,
    useMyBookingQuery
} = hotelsApi;
