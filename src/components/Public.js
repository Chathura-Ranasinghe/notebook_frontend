// Import the 'Link' component from the 'react-router-dom' library.
// The 'Link' component is a part of the 'react-router-dom' library,
// which is commonly used in React applications for creating
// navigation links and handling client-side routing. It allows
// you to define links that, when clicked, will render the
// specified route or page without causing a full page reload.
import { Link } from 'react-router-dom'
//import './Public.css'; // Import the CSS file

const Public = () => {
    const content = (
        <section className="public">
            <header className='header'>
            </header>
            <main className="public__main">
                <div>
                    <h1>Welcome to <span>Mangala Trade Center</span></h1>
                    <p>Mangala Trade Center provides a trained staff ready to meet your repair needs.</p>
                </div>
            </main>
            <footer className='footer-button'>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public