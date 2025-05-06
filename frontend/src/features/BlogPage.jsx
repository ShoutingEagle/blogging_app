import React, { useEffect, useState} from "react";
import {useParams} from "react-router-dom" 
import "../cssFiles/BlogPage.css";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../services/apiClient";
import { baseUrl, blogDetailEndpoint} from "../network/endPoints";
import Comments from "../components/Comment";
import { setArticle } from "../slices/blogSlice";


const BlogPage = () => {
  const [activeTab, setActiveTab] = useState("article");
  const [blog,setBlog] = useState(null)
  const {blogId} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async() => {
      try {
        const articleResponse = await apiClient({
          method : "GET",
          url: `${blogDetailEndpoint}/${blogId}` ,
          baseURL: baseUrl,
          withCredentials: true
        })

        setBlog(articleResponse.data)
        dispatch(setArticle(articleResponse.data))
        
      } catch (error) {
        console.log(error)        
      }


    }


    fetchData()
  },[])

  if(!blog){
    return (
      <div>
          Loading...
      </div>
    )
  }


  return (
    
    <div className="blog-page-container">
      <div className="blog-page-banner-container">
        <img
          src={blog.article_image}
          alt="Blog Banner"
          className="blog-page-banner"
        />

        <div className="blog-page-banner-overlay-color"></div>

        <div className="blog-page-banner-wrapper">

          <div className="blog-page-banner-overlay">
            <div className="blog-page-profile-pic-wrapper">
              <img
                src={blog.owner.profile_pic}
                alt="Profile"
                className="blog-page-profile-pic"
              />
            </div>
            <div className="blog-page-user-details">
              <p className="blog-page-username">{blog.owner.username}</p>
              <p className="blog-page-date">Posted - {new Date(blog.createdAt).toLocaleDateString("en-US", {year: "numeric",month: "long",day: "numeric"})}</p>
            </div>
          </div>

          <p className="blog-page-title">{blog.title}</p>

        </div>
      </div>


      <div className="blog-page-content-cover">
        <div className="blog-page-tab-container">
          <div
            className={`blog-page-tab ${activeTab === "article" ? "active" : ""}`}
            onClick={() => setActiveTab("article")}
          >
            Article
          </div>
          <div
            className={`blog-page-tab ${activeTab === "comments" ? "active" : ""}`}
            onClick={() => setActiveTab("comments")}
          >
            Comments
          </div>
        </div>

        <div className="blog-page-tab-content">
          {activeTab === "article" ? (
            <div className="blog-page-article">
              
              <p className="blog-page-text">
                {blog.article}
              </p>

             
            </div>
          ) : (
            <div className="blog-page-comments">
              <h3 className="blog-page-comments-title">Comments</h3>
              {/* <div className="blog-page-comment">
                <img
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="User"
                  className="blog-page-comment-avatar"
                />
                <div>
                  <p className="blog-page-comment-user">Emily Watson</p>
                  <p className="blog-page-comment-text">This was super helpful, thanks for breaking it down so well!</p>
                </div>
              </div> */}
              <Comments/>

            </div>

          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
