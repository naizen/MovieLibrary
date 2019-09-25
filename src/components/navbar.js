import React, { useState } from 'react';
import NavbarSearch from '../containers/navbar-search';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar navbar-expand-md fixed-top flex-md-nowrap navbar-light bg-white shadow">
      <div className="container">
        <div className="col-3">
          <a className="navbar-brand" href="/">
            movielibrary
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
