import React from 'react';
import infoToltipSuccess from "../images/icon-success.svg";
import infoToltipFail from "../images/icon-error.svg";
import { usePopupClose } from "./hooks/usePopupClose";

const InfoTooltip = ({ onClose, isOpen, isRegister }) => {
    usePopupClose(isOpen, onClose);
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container'>
                <button
                    type="button"
                    className={`popup__close`}
                    onClick={onClose}
                    aria-label="Закрыть"
                ></button>
                <img
                    className='popup__icons'
                    src={isRegister.status ? infoToltipSuccess : infoToltipFail}
                    alt="Статус"
                ></img>
                <p className="popup__title popup__title_center"> {isRegister.message}</p>
            </div>
        </div>
    );



};

export default InfoTooltip;