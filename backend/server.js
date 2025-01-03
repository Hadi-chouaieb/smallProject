const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const db = require("./Modules/db")
const routerProfile = require("./Routes/Profile")
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT;
const bodyParser = require('body-parser'); 
const clubRoutes = require('./Routes/login');
const routerPosts = require('./Routes/Posts');
const routerDocument = require('./Routes/documents');
const routerAdmin = require('./Routes/Admin');
const routerToken = require('./Routes/TokenVerify');
const routerComite = require('./Routes/Comite');
app.use('/uploads', express.static('uploads')); 
app.use(express.json({ type: 'application/json; charset=utf-8' }));
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.HOST+':5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads/documents'))); // Adjust the path as necessary



// toekn verification

app.use('/api/protected', routerToken);



app.use('/api/Club', clubRoutes);
app.use('/api/Club', routerPosts);
app.use('/api/Club', routerProfile);  
app.use('/api/Club', routerDocument);  
app.use('/api/Club', routerComite);  



app.use('/api/admin', routerAdmin); 
app.use('/api/admin', routerDocument);  







// const password = 'club2';
// const mail = "testtest"
// bcrypt.hash(password, 10, (err, hash) => {
//   if (err) throw err;

//   // Save the hashed password to the database
//   const sql = 'INSERT INTO clubs (mail, password) VALUES (?, ?)';
//   db.query(sql, [mail, hash], (error, results) => {
//     if (error) throw error;
//     console.log('User registered successfully');
//   });
// });



app.listen(PORT, () => {
    console.log(`Backend server is running on ${process.env.HOST}:${PORT}`);
  });