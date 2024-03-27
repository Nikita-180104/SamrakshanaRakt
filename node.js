var mysql = require('mysql2');
var express = require('express');
var app = express();



var path = require("path")
// app.use(express.static(path.join(__dirname,'public')))

// Set the view engine to ejs
app.set('view engine', 'ejs');

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
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// Define a route to display the blood bank data
app.get('/', (req, res) => {
  // Query the database to get the data from the blood bank table
  connection.query('SELECT * FROM Blood_bank', (error, results, fields) => { // Replace 'blood_bank_table' with your actual table name
    if (error) {
      console.error('Error fetching data from the database:', error);
      res.status(500).send('Error on the server.');
    } else {
      // Render the data using the 'blood_bank.ejs' template
      res.render('Blood_bank', { bloodBanks: results });
    }
  });
});

// Serve static files like CSS from the 'public' directory (if you have any)
app.use(express.static('public'));

// app.get('/rec', (req, res)=>{
//   res.render("rec.ejs")
// });

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

