const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'March@2022',
    database: 'SamrakshanaRakt'
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
        return;
    }
    console.log('Connected to MySQL database!');
});

app.post('/submit-form', (req, res) => {
    const { name, phone, email, age, bloodGroup, gender, aadhar, address, city, state, zip } = req.body;
    const query = `
        INSERT INTO Donor_india 
        (name, phone, email, age, blood_group, gender, aadhar, address, city, state, zip) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    connection.query(query, [name, phone, email, age, bloodGroup, gender, aadhar, address, city, state, zip], (error, results) => {
        if (error) {
            console.error('Failed to insert data into Donor_india:', error);
            res.status(500).send('Error saving data');
            return;
        }
        console.log('Inserted data into Donor_india:', results);
        res.send('Data saved successfully');
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

