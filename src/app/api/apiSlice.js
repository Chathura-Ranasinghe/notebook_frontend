// Import necessary functions from the Redux Toolkit query library
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Create an API slice using createApi
export const apiSlice = createApi({
    // Configure the base query with the base URL for your API
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),

    // Define tag types for better type safety (Note and User)
    tagTypes: ['Note', 'User'],

    // Define API endpoints using the builder
    endpoints: builder => ({})
})