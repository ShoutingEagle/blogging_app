import crypto from "crypto"

const otpGeneration = () => {
    return crypto.randomInt(100000,999999)
}

export default otpGeneration