import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ onPostCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      alert("Title is required.");
      return;
    }
    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      imageUrl: imageUrl.trim(),
      createdTime: new Date(),
      upvotes: 0,
      comments: []
    };
    onPostCreate(newPost);
    navigate('/');
  };

  return (
    <div>
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};

export default CreatePost;


