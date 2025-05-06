import React, { useEffect, useState } from "react";
import "../cssFiles/HomeFeed.css"
import apiClient from "../services/apiClient";
import { baseUrl,blogList } from "../network/endPoints";
import { useSelector,useDispatch } from "react-redux";
import { setBlogId,setArticle, setBlogLists } from "../slices/blogSlice.js";
import {useNavigate} from "react-router-dom"





const HomeFeed = () => {
    
    const [hoverId,setHoverId] = useState("")
    const [blogLists,setBlogLists] = useState([]) 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlogList = async () => {
            try {
                const response = await apiClient({
                    method: "GET",
                    url: blogList,
                    baseURL: baseUrl,
                    withCredentials: true
                });
                console.log(response.data)
                setBlogLists(response.data);
            } catch (error) {
                console.error("Failed to fetch blog list:", error);
            }
        };
        fetchBlogList();
    }, []);

    const handleClick = (id) => {
        navigate(`/blog/${id}`)
    } 
    

    return (
        <div className="home-feed">
            {
                blogLists.length === 0 ? 
                <div className="no-list-container">
                    <div className="no-list-message">
                        <i className="no-list-icon">📭</i>
                        <h3>No Blogs to Display</h3>
                        <p>It looks like there are no blogs available right now.</p>
                        <p>Check back later or create your own!</p>
                    </div>
                </div> :
                <div className="masonry-grid">
                    {blogLists&&blogLists.map((item) => (
                        <div 
                        key={item._id} 
                        className="masonry-item"
                        onMouseOver={() => setHoverId(item._id)} 
                        onMouseLeave={() => setHoverId("")}
                        onClick={(e) => handleClick(item._id)}
                        >
                            <div className="image-wrapper">
                                {item.owner && (
                                    <div className={hoverId === item._id ? "profile-pic" : "profile-pic-hidden"}>
                                        <div className="profile-info">
                                            <img src={item.owner.profile_pic} className="user-pic" alt="img" />
                                            <div>
                                                <p className="username">{item.owner.username}</p>
                                                <p  className="date">
                                                {new Date(item.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                                </p>
                                            </div>
                                        </div>
                                  
                                        <div title="Sentiment of Article" className={`sentiment ${item.sentiment.toLowerCase()}`}>{item.sentiment}</div>
                                  </div>
                                  
                                )}

                                <img src={item.article_image} alt="img" className="masonry-image"/>
                                <div className={hoverId === item._id ? "masonry-title" : "masonry-title-hidden"}>
                                    <p title="Title" className="title">{item.title.length >= 60 ? item.title.substring(0, 60) + "..." : item.title}</p>
                                </div>
                            </div>
                      </div>
                      
                    ))}
                </div>
            }
        </div>
    );
};
export default HomeFeed;
