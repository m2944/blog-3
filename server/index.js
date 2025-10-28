// Import required packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // This line loads the .env file

// Initialize the express app
const app = new express();
const port = process.env.PORT || 5000; // Use port from .env or default to 5000

// --- Middlewares ---
// These are functions that run on every request
app.use(cors()); // Allows your React frontend to make requests to this backend
app.use(express.json()); // Allows the server to accept and parse JSON in request bodies

// --- Database Connection (MongoDB) ---
// We'll set this up in a moment.
const uri = process.env.MONGO_URI; // Your "connection string" from MongoDB Atlas
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully! 🚀');
});

// --- API Endpoints (Routes) ---

// Import your router files
const postsRouter = require('./routes/posts'); // <-- ADD THIS LINE
const authRouter = require('./routes/auth');

// "use" the routers
// Tells Express: "Any URL starting with /api/posts should be handled by postsRouter"
app.use('/api/posts', postsRouter); // <-- ADD THIS LINE

// Tells Express: "Any URL starting with /api/auth should be handled by authRouter"
app.use('/api/auth', authRouter);

// --- Start the Server ---
// ... (app.listen code)
// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server is running on port: ${port} 🏃`);
});