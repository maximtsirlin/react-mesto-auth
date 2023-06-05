import Card from './Card.js';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Main(props) {
  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards } = props;
  const currentUser = useContext(CurrentUserContext)


  return (
    <main className="content">
      {/* <!-- profile --> */}
      <section className="profile">

        <img
          src={currentUser.avatar}
          alt="Фотография профиля"
          className="profile__image"
        />
        <button
          type="button"
          className="profile__image-overlay profile__image"
          aria-label="Изменить фото"
          onClick={onEditAvatar}
        ></button>


        <div className="profile__item">
          <div className="profile__form">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__button-edit profile__icon"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      {/* <!-- Elements --> */}
      <section
        className="elements"
        aria-label="elements"
      >

        <ul className="cards">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick} 
                onCardLike={onCardLike} 
                onCardDelete={onCardDelete}
              ></Card>
            );
          })}
        </ul>

      </section>
    </main>
  );
}

export default Main;