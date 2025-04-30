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





function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAuthStatus = async () => {
            const response = await apiClient({
                method: "GET",
                url: validateUser,
                baseURL: baseUrl,  
                withCredentials: true
            })

            if(!response.data.isProfileComplete){
                navigate(completeProfile)
            } 
            response.success? dispatch(checkAuthStatus(true)): navigate(login);
        };
        fetchAuthStatus();
    }, []);
    return (
        <>
            <Navbar />
            <HomeFeed />
            
        </>
    );
}

export default Home;
