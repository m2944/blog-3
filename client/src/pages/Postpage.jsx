import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Gets the post ID from the URL
  const navigate = useNavigate();
  const { user, token } = useAuth(); // Get the full user object and token

  // 1. Fetch the single post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // --- FIX 1: Use relative URL ---
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching post.');
      }
    };
    fetchPost();
  }, [id]);

  // 2. Handle the delete button click
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        setError(null);
        // --- FIX 2: Use relative URL ---
        await axios.delete(
          `/api/posts/${id}`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        // After deleting, go back to the homepage
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.msg || 'Error deleting post.');
      }
    }
  };

  // 3. Helper variable to check for authorship
  const isAuthor = post && user && post.author._id === user.id;

  if (error) {
    return <div style={{ padding: '20px' }}><p style={{ color: 'red' }}>{error}</p></div>;
  }

  if (!post) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  // 4. Render the post and (conditionally) the buttons
  return (
    <div style={{ padding: '20px' }}>
      <h1>{post.title}</h1>
      <p>by: {post.author ? post.author.username : 'Unknown'}</p>
      
      {/* 4a. Conditionally render the admin buttons */}
      {isAuthor && (
        <div style={{ margin: '10px 0', display: 'flex', gap: '10px' }}>
          <Link to={`/update/${post._id}`} style={{ textDecoration: 'none', padding: '5px 10px', background: '#007bff', color: 'white', borderRadius: '4px' }}>
            Update
          </Link>
          <button onClick={handleDelete} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
            Delete
          </button>
        </div>
      )}
      
      {/* 4b. Display the post content */}
      <div style={{ whiteSpace: 'pre-wrap', borderTop: '1px solid #ccc', paddingTop: '20px', marginTop: '20px' }}>
        {post.content}
      </div>
    </div>
  );
}