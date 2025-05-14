import { useEffect, useRef, useState } from "react";
import "../cssFiles/UserAuth.css";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl,completeProfile,home,sendOtp, userRegister } from "../network/endPoints.js";
import Loader from "../components/Loader.jsx"
import apiClient from "../services/apiClient";
import { GiHazardSign } from "react-icons/gi";
import { emptyEmail, emptyOtp, incompleteOtp, invalidEmail, otpVerificationResponse } from "../standardResponse/notificationMessages.js";

const AuthComponent = () => {
    const { mode } = useParams()
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const emailRef = useRef()
    const [email, setEmail] = useState("")
    const otpRef = useRef([]);
    const [responseMessage, setResponseMessage] = useState("")
    const navigate = useNavigate()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    const displayMessage = (message) => {
        setResponseMessage(message)
        setTimeout(() => {
            setResponseMessage("")
        },3000)
    }


    const handleVerifyOtp = async (e) => {
        e.preventDefault();


        let otp = otpRef.current.map((item) => {
            if(!item) {
                displayMessage(incompleteOtp)
                return
            }
            return item.value
        }).join("")

        if(!otp.trim()){
            displayMessage(emptyOtp)
        }
 
        otp = Number(otp);
        

        otpRef.current.forEach((item) => (item.value = "")); // Clear OTP fields
        try {
            const response = await apiClient({
                method: "POST",
                url: userRegister,         
                baseURL: baseUrl,
                data: {
                    email,
                    otp,
                    mode
                },
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            

            if (!response.success) {
                displayMessage(otpVerificationResponse)
                throw new Error(response.data.data || "Some error occurred, please try again");
            }
            
            if(mode === "signup") navigate(completeProfile);
            if(mode === "login") navigate(home)
            }catch (error) {
            console.log(error.message)
        }
    };


    const handleSendOtp = async (e) => {
        e.preventDefault();
        const enteredEmail = emailRef.current.value.trim().toLowerCase();

        if(!enteredEmail) {
            displayMessage(emptyEmail)
            return 
        }

        if(!emailRegex.test(enteredEmail)) {
            displayMessage(invalidEmail)
            return
        }

        setIsLoading(true)

        setEmail(enteredEmail); // Update the email state

        try {
             const response = await apiClient({
            method: "POST",
            url: sendOtp,
            baseURL: baseUrl,
            withCredentials: true,
            data: {
                email:enteredEmail,
                mode
            }
            })

   
            console.log(response)
            if (!response.success) {
                displayMessage(response.message)
                setIsLoading(false)
                throw new Error(response.message || "Some error occurred, please try again");
            }
            setIsOtpSent(true);
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }

       
    };


    const handleChange = (e, index) => {
        const { value } = e.target;
        if (value.length === 1 && index < otpRef.current.length - 1) {
            otpRef.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {

        if (e.key === "Backspace" && index > 0 && !otpRef.current[index].value) {
            e.preventDefault()
            otpRef.current[index - 1].focus();
        }
    }

 
    return (
        <div className="user-auth">

            <div className="user-auth-overlay-image"><img src="https://res.cloudinary.com/dtge0owvn/image/upload/v1746640659/New_Project_l1frjg.jpg" alt="img"/></div>
            <div className="user-auth-overlay"></div>


            <div className={`user-auth-container `}>
                <p className="heading">{mode === "signup" ? "Sign Up" : "Log In"}</p>

                <div className="user-auth-body-wrapper">
                    <form className="user-auth-form" name="email" onSubmit={!isOtpSent ? handleSendOtp : handleVerifyOtp}>
                        {!isOtpSent ? (
                            <input
                                type="text"
                                ref={emailRef}
                                placeholder="Email"
                                className="user-auth-email-input"
                                disabled={isLoading}
                            />
                        ) : (
                            <div className="otp-input-container">
                                {Array(6).fill("").map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        ref={(el) => (otpRef.current[index] = el)}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className="user-auth-otp-verification-input"
                                        disabled={isLoading}
                                    />
                                ))}
                            </div>
                        )}
                        <button
                            className={`user-auth-otp-btn ${isLoading&&"user-auth-otp-btn-loading"}`}
                            disabled={isLoading}
                        >   
                            {isLoading?<Loader/>:(!isOtpSent ? "Send OTP" : "Verify OTP")}
                            
                        </button>
                    </form>

                    <div className="user-auth-display-message">
                        {responseMessage&&<div className="user-auth-message">
                            <GiHazardSign /> 
                            <p>{responseMessage}</p>
                        </div>}
                    </div>

                    <div className="user-auth-links">
                        <p >Need help?</p>
                        <p>
                            {mode==="signup" ? (
                                <>
                                    Already have an account? <span onClick={() => navigate("/userAuth/login")}>Login</span>
                                </>
                            ) : (
                                <>
                                    Don't have an account? <span onClick={() => navigate("/userAuth/signup")}>SignUp</span>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AuthComponent;









