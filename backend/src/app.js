import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";





const app = express()

const allowedOrigins = [
    "http://localhost:5173",         // Vite dev
    "https://your-frontend.vercel.app" // your deployed frontend on Vercel
  ];

  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }));

  
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser());
app.use(express.static("public"))





//routes

import authRoutes from "./route/authRoutes.js"
import blogRoutes from "./route/blogRoutes.js"
import profileRoutes from "./route/profileRoutes.js"
import testRoute from "./route/testRoute.js"


app.use("/api",testRoute)

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/blog",blogRoutes) 
app.use("/api/v1/profile",profileRoutes) 


export default app