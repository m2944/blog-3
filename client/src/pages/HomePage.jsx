import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function HomePage() {
  // 1. Set up state to store our posts and any errors
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // 2. useEffect runs once when the component mounts
  useEffect(() => {
    // 3. Define an async function to fetch data
    const fetchPosts = async () => {
      try {
        setError(null);
        // 4. Make a GET request to your "get all posts" endpoint
        const response = await axios.get('/api/posts');
        
        // 5. Store the posts from the server in our state
        setPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching posts.');
      }
    };

    // 6. Call the function
    fetchPosts();
  }, []); // <-- The empty array [] means this runs only once on mount

  // 7. Render the component
  return (
    <div style={{ padding: '20px' }}>
      <h1>Blog Feed</h1>
      
      {/* 8. Show an error message if something went wrong */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 9. Map over the 'posts' array and render each one */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h2>
              {/* 10. Link to the specific post's page */}
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            {/* 11. Display the author's username (thanks to .populate() on the server!) */}
            <p>by: {post.author ? post.author.username : 'Unknown'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}