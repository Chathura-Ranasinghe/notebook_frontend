import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch'

function App() {
  return (
    // Set up routing for your application using React Router's 'Routes' and 'Route' components.
    <Routes>
      {/* The root route */}
      <Route path="/" element={<Layout />}>
        {/* The default route for the root */}
        <Route index element={<Public />} />
        {/* Route for the login page */}
        <Route path="login" element={<Login />} />

        {/* Nested route for prefetching */}
        <Route element={<Prefetch />}>
          {/* Nested route for the dashboard */}
          <Route path="dash" element={<DashLayout />}>

            {/* Default route for the dashboard */}
            <Route index element={<Welcome />} />

            {/* Nested routes for managing users */}
            <Route path="users">
              {/* Default route for users list */}
              <Route index element={<UsersList />} />
              {/* Route for editing a user */}
              <Route path=":id" element={<EditUser />} />
              {/* Route for creating a new user */}
              <Route path="new" element={<NewUserForm />} />
            </Route>

            {/* Nested routes for managing notes */}
            <Route path="notes">
              {/* Default route for notes list */}
              <Route index element={<NotesList />} />
              {/* Route for editing a note */}
              <Route path=":id" element={<EditNote />} />
              {/* Route for creating a new note */}
              <Route path="new" element={<NewNote />} />
            </Route>

          </Route>{/* End Dash */}
        </Route>

      </Route>
    </Routes>
  );
}

export default App;