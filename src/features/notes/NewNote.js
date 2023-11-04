import { useSelector } from 'react-redux'

// Import the selector to retrieve all users
import { selectAllUsers } from '../users/usersApiSlice'

// Import the component for creating a new note
import NewNoteForm from './NewNoteForm'

// Define a functional component for creating a new note
const NewNote = () => {
    // Use useSelector to select all users from Redux state
    const users = useSelector(selectAllUsers)

    // Create content based on whether the users data is available
    const content = users ? <NewNoteForm users={users} /> : <p>Loading...</p>

    // Return the content (either the new note form or a loading message)
    return content
}

// Export the NewNote component as the default export
export default NewNote