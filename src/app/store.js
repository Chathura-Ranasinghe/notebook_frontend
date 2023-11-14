import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../features/auth/authSlice'

// Create a Redux store using the configureStore function from Redux Toolkit
export const store = configureStore({
    // Configure the store's reducer to include the API slice's reducer
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    // Add middleware to the store, including the API slice's middleware
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    // Enable Redux DevTools for debugging
    devTools: true
})

// Set up listeners for automatic action dispatches in response to API query endpoints
setupListeners(store.dispatch)