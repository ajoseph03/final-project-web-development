import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';  // Ensure this path is correct

function CommentsList({ postId, initialComments }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchComments() {
            setLoading(true);
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', postId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching comments:', error);
                setError('Failed to load comments.');
            } else {
                // Combine fetched comments with initial static comments
                setComments([...initialComments.map(comment => ({ content: comment })), ...data]);
            }
            setLoading(false);
        };

        fetchComments();
    }, [postId, initialComments]);  // Depend on initialComments to refresh when they change

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h3>Comments:</h3>
            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index}> 
                        {/* Use braces to wrap comments inside JSX */}
                        {comment.content /* Comment inside braces */}
                    </div>
                ))
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
}

export default CommentsList;
