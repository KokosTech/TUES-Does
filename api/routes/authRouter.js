const express = require('express');
const router = express.Router();
const validateForm = require('../controllers/validateForm');

const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async(req, res) => {
    validateForm(req, res);
    const potentialLogin = await pool.query('SELECT id, username, passhash FROM users u WHERE u.username = $1', [req.body.username]);

    if (potentialLogin.rows.length === 0) {
        res.status(400).json({ message: 'Invalid username or password' });
    } else {
        const isSamePass = await bcrypt.compare(
            req.body.password, 
            potentialLogin.rows[0].passhash
        );
    
        if (isSamePass) {
            const token = jwt.sign({ id: potentialLogin.rows[0].id }, process.env.JWT_SECRET);
            
            req.session.user = {
                id: potentialLogin.rows[0].id,
                username: potentialLogin.rows[0].username,
                token: token
            }

            res.status(200).json({ loggedIn: true, token });
        }
        else {
            res.status(400).json({ loggedIn: false, message: 'Invalid credentials' });
        }
    }
});

router.post('/signup', async(req, res) => {
    console.log(req.body.username);
    validateForm(req, res);

    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [req.body.username]); 
    if (existingUser.rowCount === 0) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        const newUser = await pool.query('INSERT INTO users (username, password, salt) VALUES ($1, $2) RETURNING *', [req.body.username, hashedPassword, salt]); 
        const token = jwt.sign({ id: newUser.rows[0].id }, 'supersecret', { expiresIn: '1h' });
        
        req.session.user = {
            id: newUser.rows[0].id,
            username: newUser.rows[0].username,
            token: token
        }
        res.status(200).json({ token: token });
    } else {
        res.status(400).json({ loggedIn: false, message: 'Username is already taken' });
    }
});

module.exports = router;