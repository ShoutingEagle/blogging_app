import React from "react";
import "../cssFiles/UserStats.css"

const UserStats = () => {
    const totalBlogs = 3; // Replace with actual state later

    return (
        <div className="user-stats">
            <div className="avatar">👾</div>
            <div>
                <h2>Your Stats</h2>
                <p>Total Blogs: {totalBlogs}</p>
            </div>
        </div>
    );
};

export default UserStats;
