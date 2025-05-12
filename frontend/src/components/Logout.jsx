import { RiLogoutBoxRLine } from "react-icons/ri";

import "../cssFiles/Logout.css"
import apiClient from "../services/apiClient";
import { baseUrl, login, logout } from "../network/endPoints";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async() => {
        try {
            const response = await apiClient({
                method: "GET",
                url: logout,
                baseURL: baseUrl,
                withCredentials: true
            })

            console.log(response)
            if(response.success){
                dispatch(checkAuthStatus(false))
                navigate(login)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="logout" onClick={handleLogout}>
            <span className="logout-icon"><RiLogoutBoxRLine /></span>
            <p className="logout-text">Logout</p>
        </div>
    )
}

export default Logout