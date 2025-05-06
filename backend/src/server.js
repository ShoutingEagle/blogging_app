import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/dbConnection.js"

dotenv.config({path: "./.env"})
const PORT = process.env.PORT || 5000

connectDB()
.then(() => {
    app.listen(PORT,() => {
        console.log(`server is running at port http://localhost:${PORT}`);
        
    })
})
.catch((error) => {
    console.log("MongoDB Connection failed !!",error);
})