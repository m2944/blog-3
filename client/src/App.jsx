import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreatePostPage from './pages/CreatePostPage';
import UpdatePostPage from './pages/UpdatePostPage'; // <-- 1. ADD THIS IMPORT

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/update/:id" element={<UpdatePostPage />} /> {/* <-- 2. ADD THIS ROUTE */}
        </Routes>
      </main>
    </div>
  )
}

export default App