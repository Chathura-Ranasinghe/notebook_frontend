// Import necessary modules from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import CSS styles and the main App component
import './index.css';
import App from './App';

// Import components from react-router-dom for handling routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import the 'store' object from the './app/store' module.
import { store } from './app/store';

// Import the 'Provider' component from the 'react-redux' library.
import { Provider } from 'react-redux';

// Wrap your React application with the 'Provider' component
// to make the Redux store available to all components.

// Create a new ReactDOM root using the 'createRoot' method and
// attach it to the HTML element with the 'root' id.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React application within the 'root' element.
root.render(
  // Wrap the entire application in 'React.StrictMode' for development mode checks.
  <React.StrictMode>
    {/* Provide the Redux store to the entire application using the 'Provider' component. */}
    <Provider store={store}>
      {/* Set up client-side routing using 'BrowserRouter' from 'react-router-dom'. */}
      <BrowserRouter>
        {/* Define the routing configuration using 'Routes' from 'react-router-dom'. */}
        <Routes>
          {/* Define a route that matches any path and renders the 'App' component. */}
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
