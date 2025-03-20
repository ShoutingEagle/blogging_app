import {mongoose} from "mongoose";
import DB_NAME from "../constant.js"


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        if(connectionInstance) console.log(`Database Connection Successfull !! DB Host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error",error);
        process.exit(1)
    }
}

export default connectDB