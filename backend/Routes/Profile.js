
const multer = require('multer');
const express = require('express');
const path = require('path');
const db = require("../Modules/db");
const routerProfile = express.Router();

routerProfile.use(express.static('uploads')); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/Profiles'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage: storage });
routerProfile.post('/UpdateprofileImg', upload.single('profileImage'), (req, res) => {
    const { id } = req.body;
    console.log(id)
    const profileImage = req.file ? req.file.filename : null;
    let query = 'UPDATE clubs SET ImageProfile = ? where Id_Club = ?';
        db.query(query, [profileImage,id], (err, results) => {
        if (err) {
            console.error('Error saving profile to database:', err);
            return res.status(500).json({ message: 'Error saving profile' });
        }
        res.status(201).json({ message: 'Image saved successfully', });
    });
});

routerProfile.post('/Updateprofile', upload.none(), (req, res) => {
  const { name, email, phone, bio, id } = req.body;
  let query = 'UPDATE clubs SET Name = ?, Mail = ?, Tel = ?, Bio = ? WHERE Id_Club = ?';
  db.query(query, [name, email, phone, bio, id], (err, results) => {
    if (err) {
      console.error('Error saving profile to database:', err);
      return res.status(500).json({ message: 'Error saving profile' });
    }
    res.status(201).json({ message: 'Profile saved successfully', });
  });
});



routerProfile.get('/profile/:id', (req, res) => {
    const userId = req.params.id;
  
    const query = 'SELECT * FROM clubs WHERE Id_Club = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching profile from database:', err);
        return res.status(500).json({ message: 'Error fetching profile' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      res.status(200).json(results[0]); 
    });
  });



module.exports = routerProfile;
