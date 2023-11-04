import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'

// Component for displaying a list of users.
const UsersList = () => {
    // Use the 'useGetUsersQuery' hook from your API slice to fetch users data.
    const {
        data: users,    // Fetched users data
        isLoading,      // Flag indicating if data is loading
        isSuccess,      // Flag indicating if data was successfully fetched
        isError,        // Flag indicating if an error occurred
        error           // Error object (if isError is true)
    } = useGetUsersQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })


    let content;  // Variable to hold the content to be rendered.

    if (isLoading) {
        content = <p>Loading...</p>;  // Display a loading message while fetching data.
    }

    if (isError) {
        content = (
            <p className="errmsg">
                {error?.data?.message}  {/* Display the error message if an error occurred */}
            </p>
        );
    }

    if (isSuccess) {
        // Extract the 'ids' from the fetched users data.
        const { ids } = users;

        // Generate content for the table based on the user IDs.
        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null;

        // Render a table with headers and the generated content.
        content = (
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__username">Username</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}  {/* Display the generated table content */}
                </tbody>
            </table>
        )
    }

    return content;  // Return the content to be rendered.
}

export default UsersList;  // Export the 'UsersList' component.