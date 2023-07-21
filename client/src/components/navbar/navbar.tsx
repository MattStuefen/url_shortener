import './navbar.css';

function Navbar() {
    return (
        <nav className="v-navbar">
            <a className="v-brand" href="/">URL Shortener</a>
            <ul className="v-nav-list">
                <li className={`${window.location.pathname == "/" ? 'active' : ''}`}><a href="/">Short Link</a></li>
            </ul>
            <ul className="v-nav-list">
                <li><a href="/" className="logout-button disabled">Logout</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
