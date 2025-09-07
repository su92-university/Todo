// Navbar.js
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/authcontext';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <i className="fas fa-check-circle"></i> TodoApp
        </div>
        
        <div className="navbar-controls">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>
          
          {user && user.isVerified ?  (
            <div className="user-menu">
              <button 
                className="user-avatar"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <p>Hello, {user.name}</p>
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup" className="login-btn" >
              Sign Up / Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





















// import React from 'react'
// import { Link } from 'react-router-dom'
// import "../style/nav.css"

// function Nav() {
//   return (
//     <div className='navbarmainupperddiv'>
//         <div className='navbarmainddiv'>
//             <div className='navbarlogoddiv'>
//                 <h1>HU</h1>
//             </div>
//             <div className='navbarrightside'>
//                 <div className='navbarrightsidelinksdiv'>
//                 <Link to="" className='navbarrightsidelinks'>Home</Link>
//                 <Link to="" className='navbarrightsidelinks'>About</Link>
//                 <Link to="" className='navbarrightsidelinks'>Projects</Link>
//                 <Link to="" className='navbarrightsidelinks'>Skills</Link>
//                 <Link to="" className='navbarrightsidelinks'>Contect</Link>
//                 </div>
//                 <div className='navbarrightsidebtndiv'>
//                     <button className='navbarrightsidebtn'>💀</button>
//                     <button  className='navbarleftsidebtnresume'>Resume</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Nav