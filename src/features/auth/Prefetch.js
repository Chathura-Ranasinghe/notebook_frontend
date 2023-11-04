import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// Define a React functional component called 'Prefetch'
const Prefetch = () => {
    useEffect(() => {
        // Log that the component is subscribing
        console.log('subscribing')

        // Initiate API requests to fetch notes and users using Redux store dispatch
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        // Set up cleanup function when the component unmounts
        return () => {
            // Log that the component is unsubscribing
            console.log('unsubscribing')

            // Unsubscribe from the initiated API requests to prevent memory leaks
            notes.unsubscribe()
            users.unsubscribe()
        }
    }, [])

    // Render an 'Outlet' component to allow nested routing
    return <Outlet />
}

// Export the 'Prefetch' component as the default export
export default Prefetch