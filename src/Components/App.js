import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import PostPage from './PostPage';
import CreatePost from './CreatePost';

import '../App.css';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 65,
      createdTime: new Date("2023-04-10T04:45:54.471Z"),
      title: "Which is better? Emma or Mansfield Park?",
      content: "",
      imageUrl: "https://m.media-amazon.com/images/I/714+kWe2L4L._AC_UF1000,1000_QL80_DpWeblab_.jpg",
      upvotes: 3,
      comments: ["America!!!"]
    },
    {
      id: 73,
      createdTime: new Date("2023-04-10T09:20:57.187Z"),
      title: "I'm still obsessed with the Harry Potter books.",
      content: "Even after all this time?",
      imageUrl: "https://images.squarespace-cdn.com/content/v1/5c71c7d8aadd342945360ba1/1625486773927-EUGJLI9VW29VP6Y1NCAS/Original+Order+of+the+Phoenix.jpg",
      upvotes: 23,
      comments: ["Always."]
    },
    {
      id: 87,
      createdTime: new Date("2023-04-14T23:53:31.127Z"),
      title: "Who is your favorite author of all time???",
      content: "This is a tough one...",
      imageUrl: "https://www.rd.com/wp-content/uploads/2023/03/25-BookTok-Books-That-Are-Actually-Worth-the-Hype_FT.jpg",
      upvotes: 3,
      comments: ["Anyone who hasn't gone viral on Tiktok in the past 3 years."]
    },
    {
      id: 59,
      createdTime: new Date("2023-04-08T01:19:55.739Z"),
      title: "Reading Anna Karenina, Wyd?",
      content: "",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMTQ3NTEyMDI3M15BMl5BanBnXkFtZTcwOTcxODM0OA@@._V1_.jpg",
      upvotes: 2,
      comments: []
    }
  ]);

  const addNewPost = (post) => {
    setPosts([...posts, { ...post, id: Date.now(), createdTime: new Date(), upvotes: 0, comments: [] }]);
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const upvotePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, upvotes: post.upvotes + 1 };
      }
      return post;
    }));
  };

  const updatePost = (postId, updatedTitle, updatedContent) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, title: updatedTitle, content: updatedContent };
      }
      return post;
    }));
  };

  const sortPosts = (type) => {
    const sortedPosts = [...posts].sort((a, b) => {
      if (type === 'createdTime') {
        return new Date(b.createdTime) - new Date(a.createdTime);
      } else if (type === 'upvotes') {
        return b.upvotes - a.upvotes;
      }
      return 0;
    });
    setPosts(sortedPosts);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              posts={posts} 
              sortPosts={sortPosts} 
              onUpvotePost={upvotePost}  // Passed to Home component
            />
          } 
        />
        <Route 
          path="/post/:id" 
          element={
            <PostPage 
              posts={posts} 
              onUpvotePost={upvotePost}  // Already being passed to PostPage component
              onUpdatePost={updatePost} 
              onDeletePost={deletePost} 
            />
          } 
        />
        <Route 
          path="/create" 
          element={<CreatePost onPostCreate={addNewPost} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;