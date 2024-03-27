// Import required modules
var mysql = require('mysql2');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Use body-parser as middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'March@2022',
  database: 'SamrakshanaRakt'
});

// Connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting: ' + error.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

// Route to display the form
app.get('/donate', (req, res) => {
  res.render('donate_form');
});

// Route to handle form submission and insert data into the database
app.post('/submit-donation', (req, res) => {
  const { name, phone, email, age, blood_group, gender, aadhar, address, city, state, zip } = req.body;
  const sql = `INSERT INTO Donor (name, phone, email, age, blood_group, gender, aadhar, address, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  connection.query(sql, [name, phone, email, age, blood_group, gender, aadhar, address, city, state, zip], (error, results, fields) => {
    if (error) {
      res.status(500).send('Error saving to database');
    } else {
      res.send('Donation record added successfully!');
    }
  });
});

// Start the server
var server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

