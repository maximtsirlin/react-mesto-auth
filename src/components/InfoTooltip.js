import React from 'react';
// import usePopupClose from '../hooks/usePopupClose';


const InfoTooltip = (props) => {
    const { isSuccess, isOpen, onClose, } = props;
    
    return (
        <div className={`popup popup_opened ${isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container'>
                <button
                    type="button"
                    className={`popup__close`}
                    onClick={onClose}
                ></button>
                <div className={`popup__icons ${isSuccess ? 'success' : 'error'}`}></div>
                <h2 className="popup__title popup__title_center">
                    {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
            </div>


        </div>
    );



};

export default InfoTooltip;