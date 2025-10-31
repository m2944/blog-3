import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Postpage from './pages/Postpage'; // <-- THIS IS THE FIX (lowercase 'p')
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreatePostPage from './pages/CreatePostPage';
import UpdatePostPage from './pages/UpdatePostPage'; // (Assuming you named this file 'UpdatePostPage.jsx' as we discussed)

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<Postpage />} /> {/* <-- Make sure this matches the import name */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/update/:id" element={<UpdatePostPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App