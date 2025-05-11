import React, { useEffect } from "react";
import "../cssFiles/Home.css";
import Navbar from "../features/Navbar";
import HomeFeed from "../features/HomeFeed";
import { useNavigate } from "react-router-dom";


import apiClient from "../services/apiClient.js";
import { baseUrl,completeProfile,validateUser } from "../network/endPoints.js";
import { login } from "../network/endPoints.js";
import { checkAuthStatus} from "../slices/authSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Loader from "../components/Loader.jsx";





function Home() {
    console.log("Home Component")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading,setIsLoading] = useState(true) 

    useEffect(() => {
            const fetchAuthStatus = async() => {
                try {
                const response = await apiClient({
                    method: "GET",
                    url: validateUser,
                    baseURL: baseUrl,  
                    withCredentials: true
                })
                setIsLoading(false)
                if(!response.success){
                    navigate(login)
                }

                if(response.success){
                    if(response.data.isProfileComplete){
                        dispatch(checkAuthStatus(true))
                    }else{
                        navigate(completeProfile)
                    }
                }
                }catch (error) {
                    console.log(error)
                }
            }

        fetchAuthStatus();
    },[]);
    return (
        <>  
            {
                isLoading?
                    <div className="loading-container">
                        <div className="loader-wrapper">
                            <Loader />
                            <p className="loading-text">Loading, please wait...</p>
                        </div>
                    </div>:
                    <>
                        <Navbar />
                        <HomeFeed />
                    </>

            }
        </>
    );
}

export default Home;
