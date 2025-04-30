import React from "react";
import "../cssFiles/ArticleList.css";
import { FaEdit, FaCommentAlt, FaStar, FaShareAlt, FaTrash } from "react-icons/fa";

const articles = [
    {
        _id: "1",
        title: "The Evolution of Gaming: From Pixels to Photorealism",
        content: "Gaming has come a long way since the days of 8-bit graphics and limited soundtracks...",
        author: { username: "GameMaster99" },
        comments: 12,
        rating: 8,
        category: "Gaming"
    },
    {
        _id: "2",
        title: "Top 10 Indie Games of 2024 You Shouldn't Miss",
        content: "Indie games continue to surprise us with innovative gameplay and heartfelt storytelling...",
        author: { username: "IndieHunter" },
        comments: 8,
        rating: 5,
        category: "Indie"
    },
    // ...more
];

const ArticleList = () => {
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
                                    {article.content.substring(0, 100)}...
                                </p>
                                <div className="article-actions">
                                    <span className="article-category">{article.category}</span>
                                    <div className="article-action-group">
                                        <FaCommentAlt className="icon" />
                                        <span>{article.comments}</span>
                                    </div>

                                    <div className="article-action-group">
                                        <FaStar className="icon star" />
                                        <span>{article.rating}</span>
                                    </div>

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
