import { useEffect } from "react";
import "../cssFiles/Home.css";
import Navbar from "../features/Navbar";
import HomeFeed from "../features/HomeFeed";
import { useNavigate } from "react-router-dom";


import apiClient from "../services/apiClient.js";
import { baseUrl,completeProfile,getUserDetail,validateUser } from "../network/endPoints.js";
import { login } from "../network/endPoints.js";
import { setAuthStatus} from "../slices/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Loader from "../components/Loader.jsx";
import Footer from "../features/Footer.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Featured from "../features/Featured.jsx";
import UserAuthentication from "../features/UserAuthentication.jsx";
import { setGlobalError } from "../slices/errorSlice.js";
import { setProfilePic, setUsername, setYourArticles } from "../slices/userDataSlice.js";
import { setSidebarToggle, sidebarToggle } from "../slices/systemSlice.js";



function Home() {
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(true) 

    useEffect(() => {
    const handleScroll = () => {
        dispatch(setSidebarToggle(false));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);


    useEffect(() => {
        const fetchAuthStatus = async() => {
            try {
                const response = await apiClient({
                    method: "GET",
                    url: validateUser,
                    baseURL: baseUrl,  
                    withCredentials: true
                })
                
                if(!response.success) {
                    dispatch(setAuthStatus({
                        isUser: false,
                        login: true,
                        otpsent: false,
                        signup: false,
                        isProfileComplete: false
                    }))
                }
                else{
                    if(!response.data.isProfileComplete){
                        dispatch(setAuthStatus({
                            isUser: true,
                            login: false,
                            otpsent: false,
                            signup: false,
                            isProfileComplete: false
                        }))
                    }else{
                        dispatch(setAuthStatus({
                            isUser: true,
                            login: false,
                            otpsent: false,
                            signup: false,
                            isProfileComplete: true
                        }))
                    }
                }
                setIsLoading(false)
                
            }catch(error){
                console.log(error)
            }
        }
        fetchAuthStatus();
    },[]);

    useEffect(() => {
        const userData = async() => {
            try {
                const response = await apiClient({
                    method: "GET",
                    url: getUserDetail,
                    baseURL: baseUrl,
                    withCredentials: true
                })
                if(!response) dispatch(setGlobalError(response.message))
                const {username,profile_pic} = response.data.userDetails
                dispatch(setUsername(username))
                dispatch(setYourArticles(response.data.blogs))
                dispatch(setProfilePic(profile_pic))


            } catch (error) {
                dispatch(setGlobalError(error.message))
            }
        }
        userData()
    },[])

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
                    <div 
                        className="pt-30 sm:pt-20 bg-gray-100 flex flex-col gap-10"
                        onScroll={() => dispatch(setSidebarToggle(false))}
                        onClick={() => dispatch(setSidebarToggle(false))}
                    >
                        <div className="flex flex-col-reverse md:flex-row gap-4 items-center justify-center w-full h-full md:h-[35rem] px-6">
                            <Featured/>
                            <UserAuthentication/>
                        </div>
                        <HomeFeed />
                        <Footer/>
                    </div>


            }

        </>
    );
}

export default Home;
