import logo from '../images/logo.svg';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom'

function Header({ userData, logOut }) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип Mesto Russia"
        className="header__logo"
      />
      <Routes>

        {/* <Route exact path="/"  element={
          <>
                <button className={`${props.hamburgerStatus ? "header__hamburger-button_active" : "header__hamburger-button"}`} onClick={props.onHamburgerMenuClick} type="button" ></button>
                </>
              } /> */}



        <Route path="/sign-in" element={
          <>
            <Link className="header__auth-link" to="/sign-up">
              Регистрация
            </Link>
          </>
        } />

        <Route path="/sign-up" element={
          <>
            <Link className="header__auth-link" to="/sign-in">
              Войти
            </Link>
          </>
        } />


        <Route
          exact
          path="/"
          element={
            <>
              <p className="header__auth-email">{userData.email}</p>
              <button
                className="header__button"
                onClick={logOut}>Выйти</button>
            </>
          } />







        {/* <Route path='/sigh-up' element={
          <Link className='header__link' to='/sign-in'>Регистрация</Link>
        } />


        <Route path="/" element={
          <>
            <p className='header__link'>{ }</p>
            <Link className='header__link header__link_inactive' to='/sign-in'>Выйти</Link>
          </>
        } />

        <Route path='/sigh-up' element={
          <Link className='header__link' to='/sign-in'>Войти</Link>
        } /> */}





      </Routes>



    </header>
  );
}

export default Header;