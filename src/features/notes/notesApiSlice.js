// Import necessary functions from libraries
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

// Create an entity adapter for managing normalized data
const notesAdapter = createEntityAdapter({
    // Define a custom sorting comparer for your entities
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

// Define the initial state using the adapter
const initialState = notesAdapter.getInitialState()

// Create an API slice for managing notes data
export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Define an API query for fetching notes
        getNotes: builder.query({
            query: () => '/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // Transform the response data and update the state with it
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                return notesAdapter.setAll(initialState, loadedNotes)
            },
            // Define tags to invalidate when this query is used
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ]
                } else return [{ type: 'Note', id: 'LIST' }]
            }
        }),
        // Define an API mutation for adding a new note
        addNewNote: builder.mutation({
            query: initialNote => ({
                url: '/notes',
                method: 'POST',
                body: {
                    ...initialNote,
                }
            }),
            // Define tags to invalidate when this mutation is used
            invalidatesTags: [
                { type: 'Note', id: "LIST" }
            ]
        }),
        // Define an API mutation for updating a note
        updateNote: builder.mutation({
            query: initialNote => ({
                url: '/notes',
                method: 'PATCH',
                body: {
                    ...initialNote,
                }
            }),
            // Define tags to invalidate when this mutation is used
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
        // Define an API mutation for deleting a note
        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: `/notes`,
                method: 'DELETE',
                body: { id }
            }),
            // Define tags to invalidate when this mutation is used
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
    }),
})

// Create hooks for using the API endpoints
export const {
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
} = notesApiSlice

// Get the result object of the "getNotes" query
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

// creates memoized selector
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)