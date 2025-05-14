import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";





const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser());
app.use(express.static("public"))





//routes

import authRoutes from "./route/authRoutes.js"
import blogRoutes from "./route/blogRoutes.js"
import profileRoutes from "./route/profileRoutes.js"
import testRoute from "./route/testRoute.js"
import errorHandler from "./util/errorHandler.utility.js";


app.use("/api",testRoute)

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/blog",blogRoutes) 
app.use("/api/v1/profile",profileRoutes) 




export default app