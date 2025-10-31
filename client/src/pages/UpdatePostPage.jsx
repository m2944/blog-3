import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UpdatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();
  const { token, user } = useAuth();

  // 1. Fetch the existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/posts/${id}`);
        const post = response.data;
        
        // 2. Security check: If the logged-in user is not the author, kick them out.
        if (post.author._id !== user.id) {
          setError('You are not authorized to edit this post.');
          setTimeout(() => navigate(`/post/${id}`), 2000); // Redirect after 2s
          return;
        }
        
        // 3. Populate the form fields
        setTitle(post.title);
        setContent(post.content);

      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching post.');
      }
    };

    if (user) { // Only fetch if we know who the user is
      fetchPost();
    }
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError('You must be logged in.');
      return;
    }

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      // 4. Send the update request to our new server route
      const response = await axios.post(
        `http://localhost:5001/api/posts/update/${id}`,
        { title, content },
        config
      );
      
      // 5. Redirect back to the post page
      navigate(`/post/${response.data.post._id}`);

    } catch (err) {
      setError(err.response?.data.msg || 'Error updating post.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Content:</label><br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="10"
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}