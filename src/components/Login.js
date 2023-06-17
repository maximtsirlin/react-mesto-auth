import { useState } from 'react';




const Login = (props) => {
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
        props.handleLogin({ password, email });
    }



    return (
        <div className='auth'>
            <div className='auth__content'>
                <form className='auth__form' name='auth-form' action='#' method='post' onSubmit={handleSubmit}>
                    <h1 className='auth__title'>Вход</h1>
                    <div className='auth__container-inputs'>
                        <input
                            className='auth__input'
                            type="email"
                            name="email"
                            placeholder="Email"
                            minLength="1"
                            maxLength="40"
                            required
                            onChange={handleAddEmail}

                        />
                        <span className='auth__input-error'></span>
                        <input
                            type='password'
                            className='login__input'
                            placeholder='Пароль' 
                            id="password__input"
                            name="password"
                            defaultValue=""
                            minLength="2"
                            maxLength="200"
                            required
                            onChange={handleAddPassword}
                            
                            />
                        <span className='auth__input-error'></span>
                    </div>
                    <button type='submit' className='auth__button'>Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Login 