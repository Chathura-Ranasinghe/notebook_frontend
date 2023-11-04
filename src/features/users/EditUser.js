import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Import the selector to retrieve user data by ID
import { selectUserById } from './usersApiSlice'

// Import the component for editing user information
import EditUserForm from './EditUserForm'

// Define a functional component for editing a user
const EditUser = () => {
    // Extract the "id" parameter from the route using useParams
    const { id } = useParams()

    // Use the useSelector hook to select user data by ID from Redux state
    const user = useSelector(state => selectUserById(state, id))

    // Create content based on whether the user data is available
    const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

    // Render the content (either the edit form or a loading message)
    return content
}

// Export the EditUser component as the default export
export default EditUser