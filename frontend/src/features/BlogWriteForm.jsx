import React, { useRef, useState } from "react";
import axios from "axios"
import "../cssFiles/BlogWriteForm.css"
import { useDispatch } from "react-redux";
import apiClient from "../services/apiClient";
import { baseUrl, blogPost } from "../network/endPoints";
import { showPopup } from "../slices/popUpMesssageSlice";
import Loader from "../components/Loader";

const BlogWriteForm = () => {
    const [isLoading,setIsLoading] = useState(false)
    const formRef = useRef()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const form = formRef.current;
        const formData = new FormData(form); // ✅ this includes text + file inputs
        try {
            const response = await apiClient({
                method: "POST",
                url: blogPost,
                baseURL: baseUrl,
                data: formData,
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            
            if(response.success) {
                dispatch(showPopup({
                    message: response.message,
                    type: "success",
                    isVisible: true
                }))
                form.reset()
                setIsLoading(false)
            }
            console.log(response)
            
        } catch (error) {
            console.log(error)
            dispatch(showPopup({
                message: error.message,
                isVisible: true
            }))
            setIsLoading(false)
        }
    }

    return (
        <div className="write-blog-section">
            <div className='write-blog-header'>
                <p className="write-blog-header-title">Write a new Article</p>
            </div>

            <form className="write-blog-body" ref={formRef} onSubmit={handleSubmit}>
                <div className="category-selector">
                    <label htmlFor="category" className="category-label">Category. </label>
                    <select id="category" name="category" className="category-dropdown">
                        <option value="">Select a category</option>
                        <option value="gaming">Gaming</option>
                        <option value="pc">PC</option>
                        <option value="consoles">Consoles</option>
                    </select>
                </div>

                <div className="write-blog-image">
                    <p className="write-blog-image-text">Upload an image.</p>
                    <input
                        type="file"
                        name="file"
                        className="write-blog-upload-image"
                    />
                </div>

                <div className="write-blog-title">
                    <p className="write-blog-title-text">Title.</p>
                    <textarea
                        name="title"
                        className="write-blog-title-input"
                        placeholder="Title for your blog content here..."
                    />
                </div>

                <div className="write-blog-article">
                    <p className="write-blog-article-text">Article.</p>
                    <textarea
                        name="article"
                        className="write-blog-article-input"
                        placeholder="Write your blog content here..."
                    />
                </div>

                <button 
                    type="submit" 
                    className="post-article-btn"
                    disabled={isLoading}
                >
                    {isLoading?<Loader/>:"Post Article"}
                </button>
            </form>
        </div>
    );
};

export default BlogWriteForm;
