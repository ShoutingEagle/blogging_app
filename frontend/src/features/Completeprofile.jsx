import {useNavigate} from "react-router-dom"
import apiClient from "../services/apiClient.js"
import "../cssFiles/Completeprofile.css"; // create this CSS file too
import { baseUrl,home,remainingUserDetail} from "../network/endPoints.js";
import validateImageSize from "../services/validateImageSize.js";
import Loader from "../components/Loader.jsx";
import { useState } from "react";


function CompleteProfile() {
    const [error,setError] = useState("")
    const [isLoading,setIsLoading] = useState(null)
    const navigate = useNavigate()
    const uploadProfileData = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        const username = e.target.username.value
        const file = e.target.file.files[0]
        // const fileName = file.name.length > 20 ? file.name.substring(0,20) + "..." : file.name

        if (!username.trim()) {
        setError("⚠️ Username cannot be empty");
        setIsLoading(false);
        return;
        }

        if(!file) {
            setError("⚠️ Please upload a file")
            setIsLoading(false)
            return 
        }

        try {
            await validateImageSize(file)
            const formData = new FormData()
            formData.append("file",file)
            formData.append("username",username)
            const response = await apiClient({
                method : "POST",
                url: remainingUserDetail,
                baseURL: baseUrl,
                data: formData,
                withCredentials: true
            })   

            console.log(response)
            if(response.success) {
                navigate(home)
            } else{
                setError("Something went wrong")
            }
        } catch (error) {
            setError(error.message || "An error occured")
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="complete-profile">
            <div className="complete-profile-container">
                <h2 className="complete-profile-heading">
                    Before you start, two more things:
                </h2>
                <p className="complete-profile-subtext">
                    Upload your profile picture and create a username
                </p>

                <form className="complete-profile-form" onSubmit={uploadProfileData}>
                    <div className="input-group">
                        <label htmlFor="profilePic">Upload your Profile Picture</label>
                        <input type="file" name="file" id="profilePic" accept="image/*" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="Create your username" />
                    </div>

                    <button type="submit" className="submit-button" disabled={isLoading}>{isLoading?<Loader/>:"Save and Continue"}</button>
                </form>
            </div>
        </div>
    );
}

export default CompleteProfile;
