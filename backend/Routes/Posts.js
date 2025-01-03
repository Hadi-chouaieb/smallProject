// src/routes/routerPosts.js
const express = require('express');
const routerPosts = express.Router();
const multer = require('multer');
const db = require("../Modules/db");

// Helper function to format date
function formatDate(date) {
    const options = { day: 'numeric', month: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine destination based on file type
    const fileType = file.mimetype.split('/')[0];  // 'image' or 'video'
    const uploadFolder = fileType === 'image' ? 'uploads/images/' : 'uploads/videos/';
    cb(null, uploadFolder); // Store in the appropriate folder
  },
  filename: (req, file, cb) => {
    // Create a unique filename using timestamp and original filename
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// File upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },  // 50 MB max file size
  fileFilter: (req, file, cb) => {
    const fileType = file.mimetype.split('/')[0];
    if (fileType === 'image' || fileType === 'video') {
      return cb(null, true);
    }
    return cb(new Error('Invalid file type. Only images and videos are allowed.'));
  }
});

// Route to create a post with image or video upload
routerPosts.post("/CreatePost", upload.single('file'), (req, res) => {
    const { description, id } = req.body;
    const file = req.file;  // The uploaded file (image or video)
    
    // Check if a file was uploaded
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Store file path and type (image or video)
    const filePath = file.path; 
    const fileType = file.mimetype.split('/')[0]; // 'image' or 'video'
    const date = formatDate(Date.now());

    // Insert post data into the database
    const query = 'INSERT INTO posts (Id_ClubPost, description, file_path, file_type, date) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [id, description, filePath, fileType, date], (err, result) => {
        if (err) {
            console.error('Error saving post to database:', err);
            return res.status(500).json({ message: 'Error saving post' });
        }
        res.status(201).json({ message: 'Post created successfully', postId: result.insertId });
    });
});

// Route to get all posts
routerPosts.get("/GetPosts", (req, res) => {
    const query = 'SELECT * FROM posts p, clubs c WHERE c.Id_Club = p.Id_ClubPost ORDER BY p.Id_Post DESC '; 

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving posts from database:', err);
            return res.status(500).json({ message: 'Error retrieving posts' });
        }
        res.status(200).json(results); 
    });
});

// Route to get posts by specific club ID
routerPosts.get("/GetPostsWithId/:id", (req, res) => {
    const query = 'SELECT * FROM posts p, clubs c WHERE c.Id_Club = p.Id_ClubPost AND Id_ClubPost = ? ORDER BY p.date DESC';

    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error retrieving posts from database:', err);
            return res.status(500).json({ message: 'Error retrieving posts' });
        }
        res.status(200).json(results); 
    });
});

module.exports = routerPosts;
