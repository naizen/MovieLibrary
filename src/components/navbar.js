import React, { useState } from 'react';
import NavbarSearch from '../containers/navbar-search';
import { MdMovie } from 'react-icons/md';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar navbar-expand-md fixed-top flex-md-nowrap navbar-light bg-white shadow">
      <div className="container">
        <div className="col-3">
          <a className="navbar-brand" href="/">
            <MdMovie
              size={24}
              color="rgba(0,0,0,0.6)"
              style={{ marginRight: 5 }}
            />
            <span
              style={{
                fontWeight: 500,
                color: 'rgba(0,0,0,0.8)',
                verticalAlign: 'middle'
              }}
            >
              MovieLibrary
            </span>
          </a>
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}
          id="navbarNavDropdown"
        >
          <div className="col-md-8">
            <NavbarSearch />
          </div>
        </div>
      </div>
    </nav>
  );
}
