import { Outlet } from 'react-router-dom'; // Import the 'Outlet' component from 'react-router-dom'.
import DashHeader from './DashHeader'; // Import the 'DashHeader' component from './DashHeader'.
import DashFooter from './DashFooter'; // Import the 'DashFooter' component from './DashFooter'.

const DashLayout = () => { // Define a functional component called 'DashLayout'.
    return (
        <>
            <DashHeader /> {/* Render the 'DashHeader' component. */}
            <div className="dash-container"> {/* Create a div with the class name 'dash-container'. */}
                <Outlet /> {/* Render the 'Outlet' component. This is where the nested route content will be displayed. */}
            </div>
            <DashFooter /> {/* Render the 'DashFooter' component. */}
        </>
    );
};

export default DashLayout; // Export the 'DashLayout' component as the default export.