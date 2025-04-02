import nodemailer from "nodemailer"
import ApiError from "./ApiError.js"

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendEmail = async ({to,subject,text,html}) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html
        }

        const response = await transporter.sendMail(mailOptions)
        return response
    } catch (error) {
        throw new ApiError(500,"email sending error",error.message)
    }
}


export default sendEmail