import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../../contexts/auth.context";
import logo from '../../../assets/fittrackerGreenBG.svg'

import './navbar.css';

const renderNavLinkActive = ({ isActive }) => isActive ? '' : 'active';

function Navbar() {
  const { user, doLogout } = useContext(AuthContext);
  return (
    <nav className="navbar">
        <Link className="navbar-brand" to="/"> <img className='navbar-logo' src={logo}></img> FitTracker</Link>
    
        <div className="navbar-links-container">
          <ul className="navbar-links">
          
          <li><NavLink to={'/'}> <div className="link"><i className={`fa-solid fa-house ${renderNavLinkActive}`}></i><span className="navbar-link-text">Home</span></div></NavLink></li>
          <li><NavLink to={'/list-workout'}> <div className="link"><i className="fa-solid fa-list"></i><span className="navbar-link-text">Workouts</span></div></NavLink></li>
          <li><NavLink to={'/search-exercises'}> <div className="link"><i className="fa-solid fa-dumbbell"></i><span className="navbar-link-text">Exercises</span></div></NavLink></li>
          <li><NavLink to={'/list-recipe'}> <div className="link"><i className="fa-solid fa-bowl-food"></i><span className="navbar-link-text">Recipes</span></div></NavLink></li>
          <li><NavLink to={'/search-exercises'}> <div className="link"><i className="fa-solid fa-calendar-days"></i><span className="navbar-link-text">Calendar</span></div></NavLink></li>

          
          
        </ul>
        
        <ul className="navbar-profile-links">
                
                <li> <div className={`navbar-profile-image`}><img style={{ transform: `scale(${user.avtScale})` }} src={user.avatar} alt="" /></div> <Link to={`/profile`}>{user.username}</Link></li>
                <li><button className="button red" onClick={doLogout}>Logout</button></li>
          </ul>
        </div>
        
    </nav>
  );
}

export default Navbar;