import { useEffect, useRef, useState } from "react";
import "../cssFiles/Comment.css"
import apiClient from "../services/apiClient.js";
import { baseUrl, getBlogComments, postBlogComment } from "../network/endPoints.js";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";




const Comments = () => {
    const inputRef = useRef(null)
    const {blogId} = useParams()
    const articleDetail = useSelector(state => state.blog.article)
    const [allComments,setAllComments] = useState(null)

    
    useEffect(() => {
        console.log("Inside useEffect")
        const getComments = async() => {
            try {
                const comments = await apiClient({
                    method: "GET",
                    url: `${getBlogComments}/${blogId}`,
                    baseURL: baseUrl,
                    withCredentials: true
                })
    
                console.log(comments.data)
                setAllComments(comments.data)
                
            } catch (error) {
                console.log(error.message)
            }
        }
    
        getComments()
    },[])

    

    const handleComment = async(parentCommentId,content = inputRef.current?.value) => {
        console.log(inputRef.current.value,blogId,articleDetail)
        const comment = inputRef.current.value
        try {
            const response = await apiClient({
                method: "POST",
                url: `${postBlogComment}/${blogId}`,
                baseURL: baseUrl,
                withCredentials: true,
                data: {
                    comment,
                    parentCommentRef: parentCommentId
                }
            })

            console.log(response)
            inputRef.current.value = ""
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="comment-container">
            <div className="comment-input-section">
                <div className="comment-user-pic-wrapper">
                    <img src={articleDetail.owner.profile_pic} className="comment-user-pic" alt="User" />
                </div>
                <div className="comment-interaction-wrapper">
                    <input 
                        type="text" 
                        className="comment-input" 
                        placeholder="Write a comment..." 
                        ref={inputRef}
                    />
                    <button 
                        className="comment-submit-button" 
                        onClick={() => handleComment(null)}
                    >
                        Comment
                    </button>
                </div>
            </div>


            <div className="comments-container">
                {allComments?.map(comment => (
                    <div key={comment._id} className="comment-box">
                        <div className="comments-profile-pic-wrapper">
                            <img 
                                src={comment.commentedUserRef.profile_pic} 
                                alt="User" 
                                className="comment-user-pic" 
                            />
                        </div>
                        <div className="comment-content-wrapper">
                            <div className="comment-header">
                                <span className="comment-username">{comment.commentedUserRef.username}</span>
                                <span className="comment-time">Posted : {new Date(comment.createdAt).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</span> {/* Replace with dynamic timestamp if available */}
                            </div>
                            <div className="comment-text">
                                {comment.comment}
                            </div>
                            {/* <button className="comment-reply-button">Reply</button> */}
                        </div>
                    </div>
                ))}
            </div>




        </div>
    );
};

export default Comments;
