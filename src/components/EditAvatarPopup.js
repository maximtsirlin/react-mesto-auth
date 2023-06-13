import { useRef, useEffect } from 'react';

import PopupWithForm from './PopupWithForm.js';


function EditAvatarPopup(props) {
  const {isOpen, onClose, onUpdateAvatar, isLoading} = props;
  const avatarRef = useRef('')
  
  useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = '';
    }
}, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 


  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={'Обновить аватар'}
      name={'edit-avatar'}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText={'Сохранить'}
      loadingText={'Сохранение...'}
    >
      <input
        id="addAvatar"
        ref={avatarRef}
        className="form__input form__input_link"
        type="url"
        name="avatar"
        placeholder="Ссылка на фото"
        autoComplete="off"
        minLength="2"
        required
      />
      <span className="form__input-error form__input-error_active"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;