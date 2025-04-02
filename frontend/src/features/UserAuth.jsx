import { useEffect, useRef, useState } from "react";
import "../cssFiles/UserAuth.css"; // Make sure to style it properly
import { useParams } from "react-router-dom";
import axios from "axios"

const AuthComponent = () => {
    const { mode } = useParams()
    const [isOtpSent, setIsOtpSent] = useState(false)
    const emailRef = useRef()
    const otpRef = useRef([]);

    const handleVerifyOtp = (e) => {
        e.preventDefault()
        let otp = Number(otpRef.current.map((item) => item.value).join(""))
        otpRef.current.map((item) => {
            item.value = ""
        })
    }

    const handleSendOtp = (e) => {
        e.preventDefault()
        const email = emailRef.current.value.toLowerCase()
        emailRef.current.value = ""
        const response = axios.post("http://localhost:8000/api/v1/auth/userAuth-generateOtp", {
            email,
            mode
        })

        if (response) setIsOtpSent(true)
        setIsOtpSent(true)
    }

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
            {/* <div className="user-auth-overlay"></div> */}
            {/* <button className="user-auth-back-btn">Back</button> */}
            <div className="user-auth-container">
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
                    >
                        {!isOtpSent ? "Send OTP" : "Verify OTP"}
                    </button>
                </form>
                <div className="user-auth-links">
                    <p>Need help?</p>
                    <p>
                        {isOtpSent ? (
                            <>
                                Already have an account? <span>Login</span>
                            </>
                        ) : (
                            <>
                                Don't have an account? <span>SignUp</span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>

    );
};

export default AuthComponent;









