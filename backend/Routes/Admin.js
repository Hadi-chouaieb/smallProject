const express = require('express');
const routerAdmin = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
require('dotenv').config();
const db = require("../Modules/db")


routerAdmin.post('/login', (req, res) => {
    
  const { password, mail } = req.body;
  console.log(password, mail);
  const sql = 'SELECT * FROM admins WHERE Login = ?';
  db.query(sql, [mail], (error, results) => {
      if (error) {
          return res.status(500).send('Database error: ' + error);
      }
      if (results.length === 0) {
          return res.status(401).send('Invalid email or password');
      }
      const Admin = results[0];
      bcrypt.compare(password, Admin.Password, (err, isMatch) => {
          if (err) {
              return res.status(500).send('Error comparing passwords');
          }

          if (!isMatch) {
              return res.status(401).send('Invalid email or password');
          }

          const token = jwt.sign(
              { id: Admin.Id_Admin, role: Admin.role, Name: Admin.Nom },
              process.env.JWT_SECRET,
              { expiresIn: '1h' }
          );

          res.json({
              message: 'Login successful',
              token: token,
              id: Admin.Id_Admin, // Send the admin ID
              role: Admin.role,    // Send the admin role
              name: Admin.Nom      // Send the admin name
          });
      });
  });
});



routerAdmin.get('/ListUsers', (req, res) => {

    const query = 'select ImageProfile,Name,Id_Club from clubs';
    db.query(query,(err, result) => {
        if (err) {
            console.error('Error getting users :', err);
            return res.status(500).json({ message: 'Error Getting User' });
        }
        res.status(200).json(result);
    });
})

routerAdmin.post('/CreateClub', (req, res) => {
    const { name, login, password } = req.body;
    console.log(name, login, password); 
    const sql = 'INSERT INTO clubs (Name, Login, password, role,ImageProfile) VALUES (?, ?, ?, ?,?)';
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }
        db.query(sql, [name, login, hash, "user","default.png"], (error, results) => {
            if (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({ message: 'Error creating user' });
            }
            res.status(201).json({ message: 'User created successfully' });
        });
    });
});


routerAdmin.post('/UpdateAdmin', (req, res) => {
    const { Nom, Mail, Password ,id} = req.body;
    const sql = "UPDATE admins SET Nom = ?, Login = ?, Password = ?, role = ? WHERE Id_Admin = ?";
    bcrypt.hash(Password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }
        db.query(sql, [Nom, Mail, hash, "Admin",id], (error, results) => {

            if (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({ message: 'Error creating user' });
            }
            res.status(201).json({ message: 'User created successfully' });
        });
    });
});

routerAdmin.delete('/DeleteUser/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM clubs WHERE Id_Club = ?';
    db.query(sql, [id], (error, results) => {
        if (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Error deleting user' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
});

// const password = 'admin';
// const mail = 'admin'
// bcrypt.hash(password, 10, (err, hash) => {
//   if (err) throw err;

//   // Save the hashed password to the database
//   const sql = 'INSERT INTO admins (Login, password) VALUES (?, ?)';
//   db.query(sql, [mail, hash], (error, results) => {
//     if (error) throw error;
//     console.log('User registered successfully');
//   });
// });





module.exports = routerAdmin;