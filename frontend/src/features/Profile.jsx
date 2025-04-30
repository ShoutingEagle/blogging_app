import React, { useRef, useState, useEffect } from "react";
import axios from "axios"
import "../cssFiles/Profile.css"



const Profile = () => {
    const [isOpen,setIsOpen] = useState(false)
    const [preview,setPreview] = useState("")
    const [error,setError] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);

    const handleProfilePictureUpload = () => {
        setIsOpen(true)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileName = file.name.length > 20 ? file.name.substring(0, 20) + "..." : file.name;
    
        if (!file) {
            setError("⚠️ Please upload a file");
            setPreview("");
            return;
        }
    
        const imageUrl = URL.createObjectURL(file);
        const img = new Image();
        img.src = imageUrl;
    
        img.onload = () => {
            if (img.width > 301 || img.height > 301) {
                setError(`⚠️ The image "${fileName}" exceeds the maximum allowed dimensions of 300px by 300px.`);
                setPreview(""); // don't show preview if invalid
                setSelectedFile(null)
            } else {
                setError("");
                setPreview(imageUrl); // valid preview
                setSelectedFile(file)
            }
        };
    };
    

    const handleUpload = async() => {
        if (!selectedFile) {
            setError("⚠️ No valid image selected.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post("http://localhost:8000/api/v1/profile/profile-pic",
                formData, // body
                {
                    withCredentials: true, // correct place for cookies
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
        )
        console.log("Upload success:", response.data);
        setIsOpen(false); // close modal on success
    }
      

    return (
        <div className="profile-page" >
            <div className='profile-header'>
                <p>Profile</p>
            </div>
            <div className="profile-body">
                <div className="profile-change-profile-picture">
                    <div className="profile-image-upload">
                        <div 
                            className="profile-upload-profile-pic" 
                            onClick={handleProfilePictureUpload}
                            title="upload profile picture"
                        >
                            <img src="https://www.svgrepo.com/show/530406/camera.svg" alt="img" />
                        </div>
                    </div>
                    <p>Change Your Profile Picture</p>
                </div>
            </div>

            {
                isOpen && (
                    <div className="profile-picture-upload-overlay">
                        <div className="profile-picture-upload-modal">
                            <button 
                            title="close"
                            className="profile-picture-upload-close-btn" onClick={() => setIsOpen(false)}>×</button>
                            <h3>Upload Profile Picture</h3>

                            {preview && (
                                <div className="image-preview">
                                    <img src={preview} alt="image"/>
                                </div>
                            )}

                            <div className="notice">
                            {error?<p>{error}</p>:null}
                            </div>

                            <label className="custom-file-label">
                                Choose File
                                <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                />
                            </label>
                            
                            <div className="profile-picture-upload-btn">
                                {preview && <button className="upload-btn" onClick={handleUpload}>Upload</button>}
                            </div>
                        </div>

                    </div>
                )
            }

        </div>
    );
};

export default Profile;


















