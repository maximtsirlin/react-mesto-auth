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
              <div className="header__user">
                <p className="header__auth-email">{userData.email}</p>
                <button
                  className="header__button"
                  onClick={logOut}>
                  Выйти
                </button>
              </div>
            </>
          } />



      </Routes>



    </header>
  );
}

export default Header;