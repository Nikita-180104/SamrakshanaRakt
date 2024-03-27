var mysql = require('mysql2');
var express = require('express');
var app = express();
var path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'March@2022',
  database: 'SamrakshanaRakt'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting:', error);
    return;
  }
  console.log('Connected to MySQL');

  // Create the users table
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      email VARCHAR(255) NOT NULL,
      age INT NOT NULL,
      blood_group VARCHAR(3),
      gender VARCHAR(50),
      aadhar VARCHAR(12) UNIQUE NOT NULL,
      address TEXT,
      city VARCHAR(100),
      state VARCHAR(100)
  );`;

  connection.query(createTableQuery, function(error, results, fields) {
      if (error) {
          console.error('Error creating table:', error);
          return;
      }
      console.log('Table created or already exists.');
  });
});

app.post('/submit-signup', async (req, res) => {
  // Your form handling and data insertion code here
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
