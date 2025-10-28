const router = require('express').Router();
const Post = require('../models/post.model'); // Import the Post model
const auth = require('../middleware/auth'); // <-- ADD THIS LINE

// --- GET ALL POSTS ---
// This is the route for your homepage (e.g., medium.com)
// It finds all posts and sorts them by newest first.
router.route('/').get((req, res) => {
  Post.find()
    .sort({ createdAt: -1 }) // Sort by 'createdAt' in descending order
    .populate('author', 'username') // <-- This is magic!
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

// --- GET A SINGLE POST BY ID ---
// This is for your "Read Post" page (e.g., medium.com/my-post-title)
router.route('/:id').get((req, res) => {
  Post.findById(req.params.id)
    .populate('author', 'username') // <-- Magic again!
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});

// We will add the protected C, U, and D routes (Create, Update, Delete) later.

// --- (CREATE) CREATE A NEW POST (PROTECTED) ---
// We add 'auth' middleware as the second argument.
// This route will ONLY run if 'auth' calls 'next()'
router.route('/create').post(auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    // req.user is added by the 'auth' middleware
    const author = req.user; 

    const newPost = new Post({
      title,
      content,
      author, // The ID of the logged-in user
    });

    const savedPost = await newPost.save();
    res.json({
        message: 'Post created successfully!',
        post: savedPost
    });

  } catch (err) {
    res.status(500).json('Error: ' + err);
  }
});

// ... (your existing GET and GET:id routes) ...

module.exports = router;