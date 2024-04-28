import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ posts, sortPosts, onUpvotePost }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (date) => {
    const hoursAgo = Math.floor((new Date() - new Date(date)) / 3600000);
    return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUpvote = (e, postId) => {
    e.preventDefault(); // Prevent the Link navigation
    e.stopPropagation(); // Stop further event propagation
    onUpvotePost(postId);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      <h1>Book Discussion Forum</h1>
      <div>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button onClick={() => sortPosts('createdTime')}>Sort by Date</button>
        <button onClick={() => sortPosts('upvotes')}>Sort by Upvotes</button>
        <Link to="/create">
          <button>Create New Post</button>
        </Link>
      </div>
      <div className="posts-list">
        {filteredPosts.map(post => (
          <div key={post.id} className="post-item">
            <div>
              <Link to={`/post/${post.id}`} className="post-content">
                <div className="post-time">{formatDate(post.createdTime)}</div>
                <div className="post-title">{post.title}</div>
                <div className="post-upvotes">{post.upvotes} upvotes</div>
              </Link>
              <button className="upvote-button" onClick={(e) => handleUpvote(e, post.id)}>
                Upvote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;