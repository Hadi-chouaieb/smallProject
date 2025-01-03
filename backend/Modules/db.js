const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',  
  user: 'root',     
  password: '',       
  database: 'clubs_iset_sfax' ,
  charset: 'utf8mb4'
});


db.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the MySQL database!');
});


module.exports = db;
