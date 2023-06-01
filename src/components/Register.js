import React from 'react'

const auth = () => {
    return (
        <div className='auth'>
            <div className='auth__content'>
                <form className='auth__form' name='auth-form' action='#' method='post'>
                    <h1 className='auth__title'>Регистрация</h1>
                    <div className='auth__container-inputs'>
                        <input type='text' className='auth__input' placeholder='E-mail' />
                        <span className='auth__input-error'></span>
                        <input type='password' className='login__input' placeholder='Пароль' />
                        <span className='auth__input-error'></span>
                    </div>
                    <button type='submit' className='auth__button'>Зарегистрироваться</button>
                    <p className='auth__link'>Уже зарегистрированы?&#160;
                        <Link to='/sign-in' className='auth__link'>Войти</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default auth 