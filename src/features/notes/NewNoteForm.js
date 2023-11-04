import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

// Define a React functional component for a new note form
const NewNoteForm = ({ users }) => {

    // Use the 'useAddNewNoteMutation' hook from your notes API slice
    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    // Use the 'useNavigate' hook for programmatic navigation
    const navigate = useNavigate()

    // Define state variables for the form inputs
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    // Use 'useEffect' to handle navigation after a successful note creation
    useEffect(() => {
        if (isSuccess) {
            // Clear form fields and navigate to the notes dashboard
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    // Event handlers for input changes
    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    // Determine whether the form can be saved based on input values and loading state
    const canSave = [title, text, userId].every(Boolean) && !isLoading

    // Handle the "Save Note" button click
    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            // Call the 'addNewNote' mutation when saving is allowed
            await addNewNote({ user: userId, title, text })
        }
    }

    // Create an options list for the user selection dropdown
    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    // Determine the CSS class for displaying error messages
    const errClass = isError ? "errmsg" : "offscreen"

    // Determine the CSS classes for input validation
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    // Define the content of the new note form
    const content = (
        <>
            {/* Display error messages if an error occurs */}
            <p className={errClass}>{error?.data?.message}</p>

            {/* Render the form */}
            <form className="form" onSubmit={onSaveNoteClicked}>
                <div className="form__title-row">
                    <h2>New Note</h2>
                    <div className="form__action-buttons">
                        {/* Save button with FontAwesome icon */}
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>
            </form>
        </>
    )

    return content
}

// Export the 'NewNoteForm' component as the default export
export default NewNoteForm