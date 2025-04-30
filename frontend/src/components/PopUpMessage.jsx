import React, { useState } from 'react';
import "../cssFiles/ErrorPopUpMessage.css";
import { FaExclamationTriangle } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { useSelector,useDispatch } from 'react-redux';
import { hidePopup } from '../slices/popUpMesssageSlice';

const PopUpMessage = () => {
    const popUpMessage = useSelector(state => state.popUpMessage)
    const dispatch = useDispatch()
    

    const handleClick = () => {
        dispatch(hidePopup())
    }

    if (!popUpMessage.isVisible) return null;

    return (
        <div className="error-popup-overlay">
            <div className="error-popup-center">
                <div className="error-popup-close" onClick={handleClick}>×</div>
                <div className={`error-popup-icon ${popUpMessage.type === "error"?"error":"success"}`}>
                    {popUpMessage.type === "error" ? <FaExclamationTriangle/>:
                    <CiCircleCheck/>}
                </div>
                <p className="error-popup-message">{popUpMessage.message || "Oops! Something went wrong. Please try again." }</p>
            </div>
        </div>
    );
};

export default PopUpMessage;
