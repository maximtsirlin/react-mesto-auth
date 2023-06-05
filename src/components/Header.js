import logo from '../images/logo.svg';
import React from 'react';
import {Route, Routes, Link} from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип Mesto Russia"
        className="header__logo"
      />
      <Routes>

        <Route path="/" element={
          <>
            <p className='header__link'>{ }</p>
            <Link className='header__link header__link_inactive' to='/sign-in'>Выйти</Link>
          </>
        } />

        <Route path='/sigh-up' element={
          <Link className='header__link' to='/sign-in'>Войти</Link>
        } />


        <Route path='/sigh-up' element={
          <Link className='header__link' to='/sign-in'>Регистрация</Link>
        } />



      </Routes>



    </header>
  );
}

export default Header;