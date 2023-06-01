import logo from '../images/logo.svg';
import React from 'react';

function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип Mesto Russia"
        className="header__logo"
      />
    </header>
  );
}

export default Header;