const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
require('dotenv').config();
const db = require("../Modules/db")

router.post('/login', (req, res) => {
  const { password, mail } = req.body;

  // Query to find the user by email
  const sql = 'SELECT * FROM clubs WHERE Login = ?';

  db.query(sql, [mail], (error, results) => {
      if (error) {
          return res.status(500).send('Database error: ' + error);
      }

      if (results.length === 0) {
          return res.status(401).send('Invalid email or password');
      }

      const user = results[0];

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            
            return res.status(500).send('Error comparing passwords');

          }

          if (!isMatch) {
              return res.status(401).send('Invalid email or password');
          }

          // Create a JWT token with user details
          const token = jwt.sign(
              { id: user.Id_Club, role: user.Role, mail: user.Login, Name: user.Name },
              process.env.JWT_SECRET,
              { expiresIn: '1h' }
          );

          // Send the token and user ID in the response
          res.json({
              message: 'Login successful',
              token: token,
              id: user.Id_Club,
              role: user.role, // Include role in the response
              name: user.Name   // Include name in the response
          });
      });
  });
});






module.exports = router;