import { useSelector } from "react-redux"
import Login from "./Login.jsx"
import RemainingUserDetails from "./RemainingUserDetails.jsx"
import OtpVerification from "./OtpVerification.jsx"
import Signup from "./Signup.jsx"
import { AnimatePresence, motion } from "framer-motion"

const slideVariants = {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.4 } },
    exit: { y: -300, opacity: 0, transition: { duration: 0.3 } }
}

const UserAuthentication = () => {
    const userStatus = useSelector(state => state.status)
    
    const { isUser, login, otpsent, isProfileComplete } = userStatus

    let activeComponent = null;

    if (!isUser) {
        if (login) {
            activeComponent = <Login />;
        } else if (otpsent) {
            activeComponent = <OtpVerification />;
        } else {
            activeComponent = <Signup />;
        }
    } else if (!isProfileComplete) {
        activeComponent = <RemainingUserDetails />;
    }

    return (
        <div className={`h-full w-full ${isProfileComplete?"hidden":"flex"} justify-center items-center overflow-hidden`}>
            <AnimatePresence mode="wait">
                {activeComponent && (
                    <motion.div
                        key={activeComponent.type.name} // unique key for AnimatePresence
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full h-full flex justify-center items-center overflow-hidden "
                    >
                        {activeComponent}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default UserAuthentication
