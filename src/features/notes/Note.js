import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

//import { useSelector } from 'react-redux'
//import { selectNoteById } from './notesApiSlice'
import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'

// A component for displaying a single note.
const Note = ({ noteId }) => {
    // Use the 'selectNoteById' selector to get the note data by 'noteId'.
    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        }),
    })

    // Get the 'navigate' function from 'react-router-dom' for navigation.
    const navigate = useNavigate()

    if (note) {
        // Format the 'createdAt' and 'updatedAt' dates for display.
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // Define a function to handle the edit button click and navigate to the edit page.
        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr className="table__row">
                <td className="table__cell note__status">
                    {/* Display the note status as "Completed" or "Open". */}
                    {note.completed
                        ? <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td>
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__title">{note.title}</td>
                <td className="table__cell note__username">{note.username}</td>

                <td className="table__cell">
                    {/* Create an edit button with an icon, and handle its click event. */}
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
        // If the note does not exist, return null (don't render anything).
        return null
    }
}

const memoizedNote = memo(Note)

export default memoizedNote  // Export the 'memoizedNote' component.