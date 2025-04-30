import { useEffect } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const Modal = () => {
    const popUpMessage = useSelector(state => state.status.popUpMessage)

    return (    popUpMessage ? (
            <div className="notification">
                <div className="notification-container">
                    <div className="dashboard-notification-close-btn" title="close">
                        <RiCloseLargeLine className="close-btn" />
                    </div>
                    <RiCloseLargeLine className="close-icon" />
                    <p>Blog posted successfully!</p>
                </div>
            </div>
        ) : null
    )
}

export default Modal