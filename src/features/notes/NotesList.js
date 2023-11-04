import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";

// Component for displaying a list of notes.
const NotesList = () => {
    // Use the 'useGetNotesQuery' hook from your API slice to fetch notes data.
    const {
        data: notes,      // Fetched notes data
        isLoading,        // Flag indicating if data is loading
        isSuccess,        // Flag indicating if data was successfully fetched
        isError,          // Flag indicating if an error occurred
        error             // Error object (if isError is true)
    } = useGetNotesQuery(undefined, {
        pollingInterval: 15000,
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
        // Extract the 'ids' from the fetched notes data.
        const { ids } = notes;

        // Generate content for the table based on the note IDs.
        const tableContent = ids?.length
            ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
            : null;

        // Render a table with headers and the generated content.
        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Username</th>
                        <th scope="col" className="table__th note__created">Created</th>
                        <th scope="col" className="table__th note__updated">Updated</th>
                        <th scope="col" className="table__th note__title">Title</th>
                        <th scope="col" className="table__th note__username">Owner</th>
                        <th scope="col" className="table__th note__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}  {/* Display the generated table content */}
                </tbody>
            </table>
        );
    }

    return content;  // Return the content to be rendered.
};

export default NotesList;  // Export the 'NotesList' component.