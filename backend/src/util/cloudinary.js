import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

const fileUpload = async(localFilePath,path,transformationOptions) => {    
    try {
        if(!localFilePath) return "file path not found"
        const uploadedData = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type:"auto",
                folder: `/blogging-app/${path}`,
                transformation: transformationOptions?[transformationOptions]:null
            }
        )
        fs.unlinkSync(localFilePath)
        return uploadedData
    } catch (error) {
        console.log(error);
        
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
    }
}

export default fileUpload