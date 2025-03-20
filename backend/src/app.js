import express from "express"
import cors from "cors"



const app = express()

app.use(cors({origin: process.env.CORS_ORIGIN,credentials: true}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))





//routes

import authRoute from "./route/authRoute.js"

app.use("/api/v1/auth",authRoute)


export default app