import React, { useEffect } from "react";
import { useRef } from "react";
import "../cssFiles/EnterOtp.css"

function EnterOtp() {


    return (
        <div className="enterotp-input">
            <div className="enterotp-input-container">

            </div>
            <button onClick={handleVerifyOtp} className="enterotp-verifyotp">Verify OTP</button>
        </div>
    );
}

export default EnterOtp;
