import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentsList from './CommentLists';

const PostPage = ({ posts, onDeletePost, onUpdatePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id.toString() === id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post ? post.title : '');
  const [editedContent, setEditedContent] = useState(post ? post.content : '');
  const [editedImageUrl, setEditedImageUrl] = useState(post ? post.imageUrl : '');

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = () => {
    onUpdatePost(post.id, editedTitle, editedContent, editedImageUrl);
    setIsEditing(false);  // Exit editing mode on save
  };

  const handleDelete = () => {
    onDeletePost(post.id);
    navigate('/');  // Redirect to the home page after deletion
  };

  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <div className="post-page">
      {isEditing ? (
        <div>
          <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
          <input type="url" value={editedImageUrl} onChange={(e) => setEditedImageUrl(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleEditToggle}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{post.title}</h2>
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
          <p>{post.content}</p>
          <button onClick={handleEditToggle}>Edit Post</button>
          <button onClick={handleDelete}>Delete Post</button>
          <CommentForm postId={post.id} />
          <CommentsList postId={post.id} initialComments={post.comments} />
        </div>
      )}
    </div>
  );
};

export default PostPage;

