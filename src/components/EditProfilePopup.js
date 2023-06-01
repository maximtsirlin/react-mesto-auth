import PopupWithForm from './PopupWithForm.js';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser, isLoading } = props;
  const currentUser = useContext(CurrentUserContext);

  const [userName, setUserName] = useState('');
  const [userAbout, setUserAbout] = useState('');

  useEffect(() => {
    if (currentUser && isOpen) {
      setUserName(currentUser.name || '');
      setUserAbout(currentUser.about || '');
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: userName,
      about: userAbout,
    });
  }

  function handleUserName(e) {
    setUserName(e.target.value);
  }

  function handleUserAbout(e) {
    setUserAbout(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={'Редактировать профиль'}
      name={'edit-profile'}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText="Cохранить"
      loadingText={'Сохранение...'}
    >
      <div className="form__section">
        <input
          id="input_element-user"
          className="form__input form__input_name"
          type="text"
          name="name"
          value={userName}
          placeholder="Имя пользователя"
          minLength="2"
          maxLength="40"
          autoComplete="off"
          onChange={handleUserName}
          required
        />
        <span className="form__input-error form__input-error_active"></span>
      </div>

      <div className="form__section">
        <input
          id="input_element-about"
          className="form__input form__input_job"
          type="text"
          name="job"
          value={userAbout}
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          autoComplete="off"
          onChange={handleUserAbout}
          required
        />
        <span className="form__input-error form__input-error_active"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
