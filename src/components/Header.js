import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/">
          <h1>MovieTrailers</h1>
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
