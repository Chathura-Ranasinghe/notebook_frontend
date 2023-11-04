import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component from the "@fortawesome/react-fontawesome" library.
import { faHouse } from "@fortawesome/free-solid-svg-icons"; // Import the "faHouse" icon from the "@fortawesome/free-solid-svg-icons" library.
import { useNavigate, useLocation } from 'react-router-dom'; // Import the "useNavigate" and "useLocation" hooks from the 'react-router-dom' library.

const DashFooter = () => { // Define a functional component called "DashFooter".
    
    const navigate = useNavigate(); // Create a "navigate" function using the "useNavigate" hook.
    const { pathname } = useLocation(); // Get the "pathname" property from the location object using the "useLocation" hook.

    const onGoHomeClicked = () => navigate('/dash'); // Define a function "onGoHomeClicked" that navigates to the "/dash" route when called.

    let goHomeButton = null; // Initialize a variable "goHomeButton" as null.
    if (pathname !== '/dash') { // Check if the current "pathname" is not equal to '/dash'.
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked} // Set the "onClick" event handler to the "onGoHomeClicked" function.
            >
                <FontAwesomeIcon icon={faHouse} /> {/* Render the FontAwesomeIcon component with the "faHouse" icon. */}
            </button>
        );
    }

    const content = (
        <footer className="dash-footer"> {/* Create a footer element with the class name "dash-footer". */}
            {goHomeButton} {/* Render the "goHomeButton" if it's not null. */}
            <p>Current User:</p> {/* Render a paragraph with the text "Current User:". */}
            <p>Status:</p> {/* Render a paragraph with the text "Status:". */}
        </footer>
    );
    return content; // Return the JSX content of the component.
};

export default DashFooter; // Export the "DashFooter" component as the default export.