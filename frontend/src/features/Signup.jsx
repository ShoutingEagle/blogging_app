import { useDispatch, useSelector } from "react-redux";
import { setAuthStatus } from "../slices/authSlice";
import { clearErrors, setLocalMessage } from "../slices/errorSlice";
import { useState, useRef } from "react";

const Signup = () => {
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
                mode: "signup"
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
        <div className="sm:h-[30rem] w-full sm:w-[25rem] flex flex-col gap-5 sm:gap-10 justify-center items-center p-6 rounded-2xl max-w-md mx-auto bg-white">
            <p className="text-2xl lg:text-3xl font-semibold text-teal-600">Sign Up</p>

            {/* Message area (keep height fixed to avoid layout shifts) */}
            <div className="h-6 text-sm text-red-500">
                {localMessage}
            </div>

            <div className="w-full flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                    disabled={isLoading}
                />

                <button
                    className="w-full py-3 rounded-md bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold hover:opacity-90 transition"
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
                Already have an account?{" "}
                <span className="text-teal-600 hover:underline cursor-pointer"
                    onClick={() => dispatch(setAuthStatus({
                        isUser: false,
                        login: true,
                        signup: false,
                        isProfileComplete: false
                    }))}
                    disabled={isLoading}
                >
                    Login
                </span>
            </p>
        </div>
    );
};

export default Signup;
