import React from 'react';
import '../cssFiles/BlogPage.css'; // We will write CSS separately

const BlogPage = () => {
  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1 className="blog-title">Blog Title Goes Here</h1>
        <div className="blog-author-info">
          <div className="author-avatar">A</div>
          <div className="author-details">
            <p className="author-name">Author Name</p>
            <p className="blog-date">April 26, 2025</p>
          </div>
        </div>
      </div>

      <div className="blog-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue...
        </p>
        <p>
          More blog paragraphs go here...
        </p>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        {/* Later we'll add the comment input and comment list here */}
      </div>
    </div>
  );
};

export default BlogPage;
