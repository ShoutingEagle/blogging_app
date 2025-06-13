import { useDispatch } from "react-redux";
import { setAuthStatus } from "../slices/authSlice";

const Signup = () => {
    const dispatch = useDispatch()
    return (
        <div className="h-[30rem] w-[25rem] flex flex-col gap-10 justify-center items-center p-6 shadow-xl rounded-2xl max-w-md mx-auto bg-white">
            <p className="text-3xl font-semibold text-teal-600">Sign Up</p>

            {/* Message area (keep height fixed to avoid layout shifts) */}
            <div className="h-6 text-sm text-red-500">
                Example: Email already in use or OTP sent successfully
            </div>

            <div className="w-full flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />

                <button
                    className="w-full py-3 rounded-md bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold hover:opacity-90 transition"
                >
                    Send OTP
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
                >
                    Login
                </span>
            </p>
        </div>
    );
};

export default Signup;
