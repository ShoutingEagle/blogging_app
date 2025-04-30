import React, { useEffect} from "react";
import "../cssFiles/Dashboard.css"
import setting from "../assets/asset-setting.svg"
import writeBlog from "../assets/asset-write-blog.svg"
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";



import apiClient from "../services/apiClient.js";
import { baseUrl,validateUser } from "../network/endPoints.js";
import { login } from "../network/endPoints.js";
import { checkAuthStatus } from "../slices/authSlice.js";
import PopUpMessage from "../components/PopUpMessage.jsx";


function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAuthStatus = async () => {
            const response = await apiClient({
                method: "GET",
                url: validateUser,
                baseURL: baseUrl,  
                withCredentials: true
            })
            response.success? dispatch(checkAuthStatus(true)): navigate(login);
        };
        fetchAuthStatus();
    }, []);
    

    function handleClick(e, link) {
        navigate(`${link}`)
    }

    return (
        <div className="dashboard">
            <PopUpMessage />
            <div className="dashboard-section">
                <div className="dashboard-header" onClick={(e) => handleClick(e, "profile")}>
                    {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Bb2Afhttps://encrypted-tbn0.gstatic.com/images?q=tbn:https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxh4AFgq59BLEbV_X5Fi3SZrB3EY-_RzudFQ&s&sy9BrQ02clOenIEcMK0etYUR5koHpQ&s" alt="" className="dashboard-header-bg-img" /> */}
                    <div className="dashboard-header-user">
                        <p className="dashboard-header-username">UserName</p>
                        <div className="dashboard-header-user-container">
                            {/* <img src={account} alt="" className="dashboard-header-user-img" /> */}
                        </div>
                    </div>
                </div>
                <div className="dashboard-write-blog" onClick={(e) => handleClick(e, "write-blog")}>
                    <div><img src={writeBlog} alt="img" /></div>
                    <p>Write new Article</p>
                </div>
                <div className="dashboard-blogs-setting" onClick={(e) => handleClick(e, "setting")}>
                    <img src={setting} alt="img" />
                    <p>Settings</p>
                </div>
                <div className="dashboard-blogs-marked-articles" >
                    <p>Marked Articles</p>
                    <div>

                    </div>
                </div>
                <div className="dashboard-blogs-your-articles">
                    <p>Your Articles</p>
                    <div>

                    </div>
                </div>
            </div>
            <div className="dashboard-outlet">
                {/* <Modal/> */}
                <Outlet />
            </div>
        </div>
        
    );
}

export default Dashboard;
