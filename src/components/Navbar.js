import React from 'react';
import '../App.css';
import bellicon from '../images/bellicon.jpg'; // Use the correct file extension
import newIcon from '../images/mednova icon.jpg'; // Replace with the path to your new icon

function Navbar({ userName }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={newIcon}
          alt="New Icon"
          className="newIcon" 
        />
        <h2 className="company-name">medNOVA DIAGNOSTICS Inc.</h2>
      </div>
      <div className="navbar-center">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
        />
      </div>
      <div className="navbar-right">
        <div className="notification-icon">
          <img
            src={bellicon}
            alt="Notifications"
            className="bell-icon"
          />
        </div>
        <div className="profile-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzXNVuLugOe2agdfS_xzIhPMShWKirm6XvHg&s"
            alt="Profile"
            className="profile-icon"
          />
          {userName && <span className="user-name">{userName}</span>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
