const express = require('express');

const multer = require('multer');
const path = require('path');
const db  = require('../Modules/db');
const routerComite = express.Router();
routerComite.use(express.static('uploads')); 
const storage = multer.diskStorage({
  destination: 'uploads/Comite',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage });
routerComite.get('/GetComite/:id', (req, res) => {
    const {id} = req.params
  const sql = 'SELECT * FROM comite where Club_Comite = ?';
  db.query(sql,[id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});
routerComite.post('/SetComite', upload.single('img'), (req, res) => {
  const { name, post ,id} = req.body;
  const img = req.file ? req.file.filename : "user.png";

  const sql = 'INSERT INTO comite (Name_comite, Post_comite, Photo_comite , Club_Comite) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, post, img ,id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    const newMember = {
      id: result.insertId,
      name,
      post,
      img,
    };
    res.json(newMember);
  });
});

routerComite.delete('/DeleteComite/:id', (req, res) => {
  const { id } = req.params;
    const sql = 'DELETE FROM comite WHERE Id_comite = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ message: 'Member deleted   successfully' });
    })
})

module.exports = routerComite;
