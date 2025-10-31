import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- 1. Import our hook

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth(); // <-- 2. Get the 'token' from our context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError('You must be logged in to create a post.');
      return;
    }

    try {
      // 3. This is the critical part: set the Authorization header
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

// 4. Send the new post data AND the config object
      const response = await axios.post(
        '/api/posts/create', // <-- This is the updated line
        { title, content },
        config
      );

      // 5. Redirect to the new post's page
      navigate(`/post/${response.data.post._id}`);

    } catch (err) {
      setError(err.response?.data.msg || 'Error creating post.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Create New Post</h2>
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
        <button type="submit">Create Post</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}