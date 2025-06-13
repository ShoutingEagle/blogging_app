import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegister, baseUrl } from "../network/endPoints.js"
import { setGlobalError, setLocalMessage } from "../slices/errorSlice.js";
import apiClient from "../services/apiClient.js";
import { setAuthStatus } from "../slices/authSlice.js";

const OtpVerification = () => {
    const otpRef = useRef([]);
    const dispatch = useDispatch()
    const {localMessage} = useSelector(state => state.error)
    const {mode,email} = useSelector(state => state.userData)
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        otpRef.current[0]?.focus();
    }, []);

    const handleChange = (e,index) => {
        if (index < otpRef.current.length - 1 && otpRef.current[index].value) {
            otpRef.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {
        const key = e.key
        if (key === "Backspace") {
            if(index > 0 && !otpRef.current[index].value){
                e.preventDefault()
                otpRef.current[index - 1].focus()
            }
            return
        }

        if (!/^\d$/.test(key)) {
            e.preventDefault()
            return;
        }

    };


const handleVerifyOtp = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    let otp = otpRef.current.map((item) => {
        if (!item) {
            dispatch(setError({ localMessage: incompleteOtp }));
            setTimeout(() => dispatch(setError({ localMessage: "" })), 3000);
            return;
        }
        return item.value;
    }).join("");

    if (!otp.trim()) {
        dispatch(setError({ localMessage: incompleteOtp }));
        setTimeout(() => dispatch(setError({ localMessage: "" })), 3000);
        setIsLoading(false);
        return;
    }

    otp = Number(otp);

    otpRef.current.forEach((item) => (item.value = "")); // Clear OTP fields

    try {
        const response = await apiClient({
            method: "POST",
            url: userRegister,
            baseURL: baseUrl,
            data: { email, otp, mode },
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });

        const resData = response.data;

        if (!resData.success) {
            setIsLoading(false);
            dispatch(setError({ localMessage: resData.message || "OTP verification failed" }));
            setTimeout(() => dispatch(setError({ localMessage: "" })), 3000);
            return;
        }

        setIsLoading(false);
        dispatch(setError({ localMessage: "OTP verified successfully" }));
        setTimeout(() => dispatch(setError({ localMessage: "" })), 3000);

        dispatch(setAuthStatus({
            isUser: false,
            login: false,
            otpsent: false,
            signup: false,
            isProfileComplete: !resData.isProfileComplete
        }));

    } catch (error) {
        setIsLoading(false);
        dispatch(setError({
            localMessage: error.response?.data?.message || error.message || "Something went wrong"
        }));
        setTimeout(() => dispatch(setError({ localMessage: "" })), 3000);
    }
};


    return (
        <div className="h-[30rem] w-[25rem] flex flex-col gap-10 justify-center items-center p-6 shadow-xl rounded-2xl max-w-md mx-auto bg-white">
            <p className="text-3xl font-semibold text-amber-600">OTP Verification</p>

            {/* Message area */}
            <div className="h-6 text-sm text-slate-600">
                {localMessage?localMessage:"Enter the 6-digit code we sent to your email"}
            </div>

            <div className="w-full flex justify-center gap-2">
                {Array(6).fill("").map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        ref={(el) => (otpRef.current[index] = el)}
                        onChange={(e) => handleChange(e,index)  } 
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="h-[3rem] w-[3rem] text-center text-lg border border-amber-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    />
                ))}
            </div>

            <button
                className="w-full py-3 rounded-md bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-semibold hover:opacity-90 transition"
                onClick={handleVerifyOtp}
            >
                {
                isLoading?
                    <p class="relative">
                        <span class="absolute inline-flex animate-ping opacity-75">Verifying...</span>
                        <span class="relative inline-flex">Verifying..</span>
                    </p>
                    :
                    <p>
                        Verify OTP
                    </p>
                }
            </button>

            {/* Extra UI */}
            <p className="text-sm text-slate-600">
                Didn't get the code?{" "}
                <span className="text-amber-600 hover:underline cursor-pointer">
                    Resend OTP
                </span>
            </p>
        </div>
    );
};

export default OtpVerification;
