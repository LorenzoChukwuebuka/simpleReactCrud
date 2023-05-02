const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
const app = express();
const port = 3000;


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Chukwuebuka',
    password: 'Chukwuebuka_123',
    database: 'vue-crud'
});

// Create a message
app.post('/messages', (req, res) => {
    const { email, message } = req.body;
    const sql = `INSERT INTO messages (email, message) VALUES (?, ?)`;
    connection.query(sql, [email, message], (err, result) => {
        if (err) return res.json({ code: 3, "message": err.message });
        return res.json({ code: 1, "message": "message created" });
    });
});

// Get all messages
app.get('/messages', (req, res) => {
    const sql = `SELECT * FROM messages`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Update a message
app.put('/messages/:id', (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    const sql = `UPDATE messages SET message = ? WHERE id = ?`;
    connection.query(sql, [message, id], (err, result) => {
        if (err) return res.json({ code: 3, "message": err.message });
        return res.json({ code: 1, "message": "message updated" });
    });
});

// Get a single message
app.get('/messages/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM messages WHERE id = ?`;
    connection.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Delete a message
app.delete('/messages/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM messages WHERE id = ?`;
    connection.query(sql, [id], (err, result) => {
        if (err) return res.json({ code: 3, "message": err.message });
        return res.json({ code: 1, "message": "message deleted" });
    });
});


connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
