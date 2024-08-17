const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM messages");
        res.status(200).json({
            status: 'Retreived all messages',
            results: response.rows.length,
            data: {
                messages: response.rows
            }
        });
    } catch(err) {
        console.log(err);
    }
});

router.post('/add', async (req, res) => {
    try {
        // Format the date as MM/DD/YYYY HH:MM:SS
        const formattedDate = new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const message = await db.query("INSERT INTO messages (user_id, title, description, created_at) VALUES ($1, $2, $3, $4) returning *",
        [req.body.user_id, req.body.title, req.body.description, formattedDate]);

        res.status(201).json({
            status: 'Message added successfully',
            data: {
                message: message.rows[0]
            }
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'Error adding message',
            error: err.message
        });
    }
})

module.exports = router;