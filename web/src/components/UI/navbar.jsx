import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../contexts/auth.context";
import logo from '../../assets/fittrackerGreen.svg'

import './navbar.css';

const renderNavLinkActive = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

function Navbar() {
  const { user, doLogout } = useContext(AuthContext);

  return (
    <nav className="main-navbar navbar navbar-expand-lg bg-body-tertiary">
        <Link className="navbar-brand" to="/"> <img className='navbar-logo' src={logo}></img> FitTracker</Link>
        <Link to={'/list-workout'}> Workouts </Link>
        <ul className="navbar-nav mb-2 mb-lg-0">
                {user.role === 'admin' && <li className="nav-item"><NavLink className={renderNavLinkActive} to="/create-restaurant"><i className="fa fa-plus"></i></NavLink></li>}
                <button className="nav-link" onClick={doLogout}>Logout</button>
          </ul>
    </nav>
  );
}

export default Navbar;