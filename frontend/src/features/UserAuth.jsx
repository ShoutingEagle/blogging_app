import { useEffect, useRef, useState } from "react";
import "../cssFiles/UserAuth.css";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl,sendOtp, userRegister } from "../network/endPoints.js";
import Loader from "../components/Loader.jsx"
import apiClient from "../services/apiClient";

const AuthComponent = () => {
    const { mode } = useParams()
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const emailRef = useRef()
    const [email, setEmail] = useState("")
    const otpRef = useRef([]);
    const [responseMessage, setResponseMessage] = useState("")
    const navigate = useNavigate()

   
    const [animateClass, setAnimateClass] = useState("");

    useEffect(() => {
        // Trigger animation on mode switch
        setAnimateClass("animate");
        const timer = setTimeout(() => {
            setAnimateClass(""); // remove after animation
        }, 400);
    
        return () => clearTimeout(timer);
    }, [mode]);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        let otp = Number(otpRef.current.map((item) => item.value).join(""));

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

            if (!response.data.success) {
                throw new Error(response.data.data || "Some error occurred, please try again");
            }
    
            setResponseMessage(response.data.data);
            navigate("/");
            
        } catch (error) {
            console.log(error.message)
        }
        

        

    };


    const handleSendOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const enteredEmail = emailRef.current.value.trim().toLowerCase();
        if (!enteredEmail) {
            setResponseMessage("Email is required");
            return;
        }

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

            if (!response.success) {
                setResponseMessage(response.message)
                throw new Error(response.message || "Some error occurred, please try again");
            }
            setIsOtpSent(true);
            setIsLoading(false)
            setResponseMessage(response.message);
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
            <div className={`user-auth-container ${animateClass}`}>
                <p className="heading">{mode === "signup" ? "Sign Up" : "Log In"}</p>
                <form className="user-auth-form" name="email" onSubmit={!isOtpSent ? handleSendOtp : handleVerifyOtp}>
                    {!isOtpSent ? (
                        <input
                            type="email"
                            ref={emailRef}
                            placeholder="Email"
                            className="user-auth-email-input"
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
                                />
                            ))}
                        </div>
                    )}
                    <button
                        className="user-auth-otp-btn"
                        disabled={isLoading}
                    >   
                        {isLoading?<Loader/>:(!isOtpSent ? "Send OTP" : "Verify OTP")}
                        
                    </button>
                </form>
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

    );
};

export default AuthComponent;









