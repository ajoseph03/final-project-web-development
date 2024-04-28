import React, { useState } from 'react';
import { supabase } from './supabaseClient';  // Ensure this path is correct

function CommentForm({ postId }) {
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const submitComment = async (event) => {
        event.preventDefault();

        console.log("Submitting comment for post ID:", postId);  // Add this line in the submitComment function


        // Trim whitespace and check if the comment is empty
        if (!comment.trim()) return;  

        const { data, error } = await supabase
            .from('comments')
            .insert([
                { content: comment.trim(), post_id: postId }
            ]);

        if (error) {
            console.error('Error submitting comment:', error.message || error); // Improved error logging
        } else {
            console.log('Comment submitted:', data);
            setComment('');  // Clear the textarea after successful submission
        }
    };

    return (
        <form onSubmit={submitComment}>
            <textarea 
                value={comment} 
                onChange={handleCommentChange} 
                placeholder="Write a comment..."
            />
            <button type="submit">Post Comment</button>
        </form>
    );
}

export default CommentForm;

