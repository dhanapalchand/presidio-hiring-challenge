import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { SidebarData } from './Navbardata';
import '../css/Navbar.css';  // Ensure you have the necessary CSS

const TopNavBarComponent = ({ onLogout }) => {
  return (
    <>
      <nav class="navbar navbar-dark bg-primary">
        <div className="navbar-links">
          {SidebarData.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="navbar-item"
              activeClassName="active"
            >
              {item.icon}
              <span class="nav-link">{item.title}</span>
            </NavLink>
          ))}
        </div>
        {/* <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> */}
        <div className="btn btn-danger" onClick={onLogout}>
          Logout
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default TopNavBarComponent;
