import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

// A component for displaying user information.
const User = ({ userId }) => {
    // Use the 'selectUserById' selector to get user data by 'userId'.
    const user = useSelector(state => selectUserById(state, userId))

    // Get the 'navigate' function from 'react-router-dom' for navigation.
    const navigate = useNavigate()

    if (user) {
        // Define a function to handle the edit button click and navigate to the edit page.
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        // Convert the 'roles' array to a comma-separated string.
        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        // Add a CSS class to the user cell if the user is inactive.
        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className={`table__row user`}>
                {/* Display the username in a table cell. */}
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                
                {/* Display the user roles in a table cell. */}
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                
                {/* Display an edit button in a table cell and handle its click event. */}
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    } else {
        // If the user does not exist, return null (don't render anything).
        return null
    }
}

export default User  // Export the 'User' component.