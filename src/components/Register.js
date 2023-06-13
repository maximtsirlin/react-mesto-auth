import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Auth = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleAddEmail(e) {
    setEmail(e.target.value);
  }

  function handleAddPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister(email, password);
  }

  return (
    <div className='auth'>
      <div className='auth__content'>
        <form
          className='auth__form'
          name='auth-form'
          action='#'
          method='post'
          onSubmit={handleSubmit}
        >
          <h1 className='auth__title'>Регистрация</h1>
          <div className='auth__container-inputs'>
            <input
              id='email__input'
              type='email'
              name='email'
              placeholder='Email'
              className='auth__field auth__input'
              minLength='1'
              maxLength='40'
              required
              onChange={handleAddEmail}
            />
            <span className='auth__input-error'></span>
            <input
              id='password__input'
              type='password'
              name='password'
              defaultValue=''
              placeholder='Пароль'
              className='auth__field auth__input'
              minLength='2'
              maxLength='200'
              required
              onChange={handleAddPassword}
            />
            <span className='auth__input-error'></span>
          </div>
          <button type='submit' className='auth__button'>
            Зарегистрироваться
          </button>
          <p className='auth__link'>
            Уже зарегистрированы?&#160;
            <Link to='/sign-in' className='auth__link'>
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
