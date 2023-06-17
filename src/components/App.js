import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, Navigate, useNavigate, Routes } from 'react-router-dom';


import api from '../utils/Api.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'

import Hamburger from './Hamburger';


import InfoTooltip from './InfoTooltip'

import * as auth from '../utils/auth';


function App(props) {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isFullImagePopupOpen, setFullImagePopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userData, setUserData] = useState({});

  const [isHamburgerOpen, setHamburgerOpen] = useState(false);

  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
  const [isRegister, setIsRegister] = useState({
    status: "",
    message: "",
  });

  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const [showLoginError, setShowLoginError] = useState(false);


  const navigate = useNavigate();


  const handleEditProfileClick = () => setEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true)
  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);


  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);


  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setToken(jwt);
  }, []);


  useEffect(() => {
    if (!token) {
      return;
    }

    auth
      .getContent(token)
      .then((user) => {
        setUserData(user.data);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);



  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setIsOpenInfoTooltip(true);
        setIsRegister({
          status: true,
          message: "Вы успешно зарегистрировались!",
        });
        navigate("/");
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setIsOpenInfoTooltip(true);
        setIsRegister({
          status: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log(err);
      });
  };



  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        setToken(res.token);
        localStorage.setItem("jwt", res.token);
        navigate("/");
      })
      .catch((err) => {
        setIsOpenInfoTooltip(true);
        console.log(err);
        setLoginErrorMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setShowLoginError(true);
      });
  };



  const logOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setToken("");
    setUserData({});
    navigate("/sign-in");

  };

  const handleHamburgerMenuClick = () => {
    setHamburgerOpen(!isHamburgerOpen);
  };







  const handleCardClick = (card) => {
    setSelectedCard(card);
    setFullImagePopupOpen(true);
  }


  const handleCardLike = (card) => {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    if (!isLiked) {

      api
        .putLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err));
    }
    else {
      api
        .removeLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? "" : newCard
        );
        setCards(newCards);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const handleUpdateUser = (info) => {
    setIsLoading(true);
    api
      .setUserInfo(info)
      .then((newUser) => {
        setCurrentUser(newUser)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }



  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    console.log(avatar)

    api
      .changeAvatar(avatar)

      .then((newAvatar) => {
        setCurrentUser(newAvatar)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

  }



  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true);
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

  }


  const closeAllPopups = () => {
    setEditProfilePopupOpen(false); // + 
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setFullImagePopupOpen(false);
    setSelectedCard({});
    setIsOpenInfoTooltip(false);

  };




  return (

    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">

        {/* <Hamburger
          isOpen={isHamburgerOpen}
          email={email}
          onSignOut={logOut}
        /> */}

        <Header
          logOut={logOut}
          userData={userData}
          hamburgerStatus={isHamburgerOpen}
          onHamburgerMenuClick={handleHamburgerMenuClick}
          email={email}
        />

        <Routes>
          <Route
            path="/"
            element={(
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                currentUser={currentUser}
                cards={cards}
              />
            )}
          />

          <Route
            path="/sign-in"
            element={
              <Login
                isloggedIn={isLoggedIn}
                handleLogin={handleLogin}
                errorMessage={loginError}
                onClose={closeAllPopups}
                title="Вход"
                buttonText="Войти"
              />
            }
          />

          <Route
            path="/sign-up"
            element={
              <Register
                isloggedIn={isLoggedIn}
                onRegister={() => (alert(33))}
                handleRegister={handleRegister}
                onClose={closeAllPopups}
                title={"Регистрация"}
                buttonText={"Зарегистрироваться"}
              />
            }
          />

          <Route
            path="/*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />

        </Routes>

        {isLoggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isFullImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isRegister={isRegister}
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
          alt={"Статус"}
          loginErrorMessage={loginErrorMessage}
        />

      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;

