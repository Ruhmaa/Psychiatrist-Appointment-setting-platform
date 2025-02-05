const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost', // Your MySQL host (usually 'localhost')
    user: 'root', // Your MySQL user
    password: '122bystanderZ5', // Your MySQL password
    database: 'psychiatrist_db' // Your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Could not connect to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// API endpoint to save appointment
app.post('/api/appointments', (req, res) => {
    const { name, email, phone, date, service } = req.body;
    console.log(req.body); // Log request body to verify it

    const currentDate = new Date();

    // Ensure date is in the correct format for MySQL if necessary
    const formattedDate = date ? new Date(date).toISOString().slice(0, 19).replace('T', ' ') : null;
    const createdOn = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const updatedOn = createdOn;

    // SQL query to insert the appointment data into the database
    const query = `
    INSERT INTO psychiatrist_db.appointmentlist 
    (name, email, phone, service, timebooked, createdOn, updatedOn) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [name, email, phone, service, formattedDate, createdOn, updatedOn], (err, result) => {
        if (err) {
            console.error('Error saving appointment:', err); // Log the error for debugging
            res.status(500).json({ message: 'Error saving appointment', error: err });
            return;
        }
        res.status(200).json({ message: 'Appointment booked successfully!', id: result.insertId });
    });
});

// API endpoint to get all appointments
app.get('/api/getappointments', (req, res) => {
    // SQL query to fetch all appointments from the database
    const query = 'SELECT * FROM psychiatrist_db.appointmentlist ORDER BY timebooked ASC';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching appointments:', err); // Log the error for debugging
            res.status(500).json({ message: 'Error fetching appointments', error: err });
            return;
        }
        res.status(200).json({ appointments: results });
    });
});

// API endpoint to update the appointment note
app.put('/api/updateappointment/:id', (req, res) => {
    const appointmentId = req.params.id;
    const { notes } = req.body; // Get updated notes from the request body

    // SQL query to update the appointment notes in the database
    const query = 'UPDATE psychiatrist_db.appointmentlist SET notes = ? WHERE id = ?';

    db.query(query, [notes, appointmentId], (err, results) => {
        if (err) {
            console.error('Error updating appointment:', err);
            res.status(500).json({ message: 'Error updating appointment', error: err });
            return;
        }
        res.status(200).json({ message: 'Appointment updated successfully', results });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
