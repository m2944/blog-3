import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage'; // <-- Import
import LoginPage from './pages/LoginPage'; // <-- Import
import CreatePostPage from './pages/CreatePostPage'; // <-- Import

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* <-- Add Route */}
          <Route path="/login" element={<LoginPage />} /> {/* <-- Add Route */}
          <Route path="/create" element={<CreatePostPage />} /> {/* <-- Add Route */}
        </Routes>
      </main>
    </div>
  )
}

export default App