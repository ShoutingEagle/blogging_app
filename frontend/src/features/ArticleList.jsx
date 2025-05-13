import React, { useEffect } from "react";
import "../cssFiles/ArticleList.css";
import { FaEdit, FaCommentAlt, FaStar, FaShareAlt, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";


const ArticleList = () => {
    const articles = useSelector(state => state.blog.bloglists)

    if (!articles.length) return <p>Loading or no articles...</p>
    return (
        <div className="article-list">
            <p className="article-list-header">My Articles</p>

            <div className="article-cards">
                {articles.map((article) => (
                    <div key={article._id} className="article-card">
                        <div className="article-card-main">
                            <div className="article-content">
                                <h3 className="article-title">{article.title}</h3>
                                <p className="article-snippet">
                                    {article.article.substring(0, 100)}...
                                </p>
                                <div className="article-actions">
                                    <span className="article-category">{article.category}</span>
                                    <div className="article-action-group">
                                        <FaCommentAlt className="icon" />
                                        <span>{article.comments}</span>
                                    </div>

                                    {/* <div className="article-action-group">
                                        <FaStar className="icon star" />
                                        <span>{article.rating}</span>
                                    </div> */}

                                    <FaEdit className="icon clickable" title="Edit Article" />
                                    <FaShareAlt className="icon clickable" title="Get Shareable Link" />
                                    <FaTrash className="icon clickable" title="Delete Article" />
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleList;
