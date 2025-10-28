import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function PostPage() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null); // State for a single post, start as null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Use the 'id' from the URL to build the API request URL
        const response = await axios.get(`http://localhost:5001/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Post not found or an error occurred.');
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchPost();
  }, [id]); // This effect re-runs if the 'id' in the URL ever changes

  // --- Render based on loading or error states ---
  if (loading) {
    return <div style={{ padding: '20px' }}>Loading post...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!post) {
    return <div style={{ padding: '20px' }}>Post not found.</div>;
  }

  // --- Render the full post content ---
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
      <h1 style={{ marginBottom: '10px' }}>{post.title}</h1>
      
      <p style={{ color: '#555', fontSize: '1em', marginTop: 0 }}>
        By: {post.author.username}
      </p>

      {/* This is a simple way to render content with line breaks.
        A better (but more complex) way is to save as Markdown. 
      */}
      <div 
        className="post-content" 
        style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}
      >
        {post.content}
      </div>

      {/* We will add Edit/Delete buttons here later */}
    </div>
  );
}