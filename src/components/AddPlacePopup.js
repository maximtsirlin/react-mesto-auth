import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, isLoading } = props;
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');


  useEffect(() => {
    if (!isOpen) {
      setCardName('')
      setCardLink('')
    }
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardName,
      link: cardLink
    })
  }

  function handleCardName(e) {
    setCardName(e.target.value);
  }

  function handleCardLink(e) {
    setCardLink(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={'Новое место'}
      name={'add-card'}
      buttonText={'Создать'}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText={'Сохранение...'}

    >
      <div className="form__section">
        <input
          id="input_card-title"
          className="form__input form__input_name"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          autoComplete="off"
          required
          // defaultValue=""
          value={cardName || ''}
          onChange={handleCardName}
        />
        <span className="popup__error popup__error_input_card-title"></span>
      </div>
      <div className="form__section">
        <input
          id="input_card-image"
          className="form__input form__input_link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required
          // defaultValue=""
          value={cardLink}
          onChange={handleCardLink}
        />
        <span className="form__input-error form__input-error_active"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;