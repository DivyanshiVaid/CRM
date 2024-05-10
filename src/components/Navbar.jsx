import React from 'react';
import { Link } from 'react-router-dom';
import '../styleSheet/navbar.css';

const Navbar = () => {
  const auth = localStorage.getItem('token');
  
  const handleSignOut = () => {
    localStorage.removeItem("token")
  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
        <li className="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
        <li className="nav-item"><Link to="/products" className="nav-link">Manage Products</Link></li>
        {auth ? <li className="nav-item" onClick={handleSignOut}><Link to="/" className="nav-link">Log Out</Link></li> : <li className="nav-item"><Link to="/login" className="nav-link">Log In</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;