// Import the Outlet component from 'react-router-dom'
import { Outlet } from 'react-router-dom';

// Define a functional component called Layout
const Layout = () => {
    // Return the Outlet component, which acts as a placeholder for rendered child routes
    return <Outlet />;
}

// Export the Layout component for use in other parts of the application
export default Layout;