import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { setAuthStatus } from "../slices/authSlice";
import { setLocalMessage,setGlobalError, clearErrors } from "../slices/errorSlice";
import { emptyEmail,invalidEmail,otpSent } from "../standardResponse/notificationMessages";
import {sendOtp,baseUrl} from "../network/endPoints.js"
import { setEmail, setMode } from "../slices/userDataSlice";
import apiClient from "../services/apiClient.js"

const Login = () => {
    const [isLoading,setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const {localMessage} = useSelector(state => state.error)
    const emailRef = useRef()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSendOtp = async (e) => {
        
        e.preventDefault();
        
        setIsLoading(true)
        const enteredEmail = emailRef.current.value.trim().toLowerCase();


        if(!enteredEmail) {
            dispatch(setLocalMessage({localMessage:emptyEmail}))
            setTimeout(() => {
            dispatch(clearErrors())
            }, 3000)
            setIsLoading(false)
            return 
        }

        if(!emailRegex.test(enteredEmail)) {
            dispatch(setLocalMessage({localMessage:invalidEmail}))
            setTimeout(() => {
            dispatch(clearErrors())
            }, 3000)
            setIsLoading(false)
            return
        }


        try {
            const response = await apiClient({
                method: "POST",
                url: sendOtp,
                baseURL: baseUrl,
                withCredentials: true,
                data: {
                email: enteredEmail,
                mode: "login"
                }
            });

            if (!response.success) {
                dispatch(setLocalMessage(response.message));
                setTimeout(() => {
                dispatch(clearErrors());
                }, 3000);
                setIsLoading(false);
                throw new Error(response.message || "Some error occurred, please try again");
            }

            setIsLoading(false);
            dispatch(setMode("login"));
            dispatch(setEmail(enteredEmail));
            dispatch(setLocalMessage(otpSent));
            setTimeout(() => {
                dispatch(clearErrors());
            }, 3000);
            dispatch(setAuthStatus({
                isUser: false,
                login: false,
                otpsent: true,
                signup: false,
                isProfileComplete: false
            }));

        } catch (error) {
            setIsLoading(false);
            dispatch(setLocalMessage(error.message));
            setTimeout(() => {
                dispatch(clearErrors());
            }, 3000);
        }


    
    };
    return (
        <div className="h-[30rem] w-[25rem] flex flex-col gap-10 justify-center items-center p-6 shadow-xl rounded-2xl max-w-md mx-auto bg-white">
            <p className="text-3xl font-semibold text-indigo-700">Login</p>
            
            {/* Message area (keep height fixed to avoid layout shifts) */}
            <div className="h-6 text-sm text-red-500">
                {localMessage}
            </div>

            <div className="w-full flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    ref={emailRef}
                    disabled={isLoading}
                />

                <button
                    className="w-full py-3 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                >
                    {
                        isLoading?
                        <p class="relative">
                            <span class="absolute inline-flex animate-ping opacity-75">Sending...</span>
                            <span class="relative inline-flex">Sending..</span>
                        </p>
                        :
                        <p>
                            Send OTP
                        </p>
                    
                    }
                </button>
            </div>

            {/* Already have an account */}
            <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <span className="text-indigo-600 hover:underline cursor-pointer"
                onClick={() => dispatch(setAuthStatus({
                    isUser: false,
                    login: false,
                    otpSent: false,
                    signup: true,
                    isProfileComplete: false
                }))}
                >
                    Sign up
                </span>
            </p>
        </div>
    );
};

export default Login;
