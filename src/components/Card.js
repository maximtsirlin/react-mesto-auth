import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `cards__delete ${isOwn ? 'cards__delete-button_active' : 'cards__delete'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `cards__button ${isLiked ? 'cards__button-active' : 'cards__button'}`
  );


  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="cards__cell">
      <img
        src={card.link}
        alt={card.name}
        className="cards__item"
        onClick={handleClick}
      />
      {isOwn && <button
        id='50'
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>}
      <div className="cards__form">
        <h2 className="cards__description">{card.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="cards__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;