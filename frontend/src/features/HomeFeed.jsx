import React, { useEffect } from "react";
import "../cssFiles/HomeFeed.css"
import apiClient from "../services/apiClient";
import { baseUrl,blogList } from "../network/endPoints";
import { useSelector,useDispatch } from "react-redux";
import { setBlogLists } from "../slices/blogSlice.js";





const HomeFeed = () => {
    const blogLists = useSelector(state => state.blog.bloglists)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchBlogList = async () => {
            const response = await apiClient({
                method: "GET",
                url: blogList,
                baseURL: baseUrl,
                withCredentials:true
            })
            dispatch(setBlogLists(response.data))
        }
        fetchBlogList()
    },[])

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
                    {blogLists.map((item) => (
                        <div key={item._id} className="masonry-item">
                            <img src={item.article_image} alt="img" className="masonry-image"/>
                            {/* <img src={item.profilePic} alt="img" className="profile-pic"/> */}
                            <p className="masonry-title">{item.title}</p> 
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};
export default HomeFeed;
