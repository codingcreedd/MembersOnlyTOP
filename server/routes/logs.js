const router = require('express').Router();
const passport = require('passport');
const db = require('../db');
const { genPassword } = require('../lib/passwordUtils');

router.post('/register', async (req, res, next) => {
    try {
        const saltHash = genPassword(req.body.pw);

        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const response = await db.query('INSERT INTO users (first_name, last_name, username, hashpassword, salt) '
        + 'VALUES ($1, $2, $3, $4, $5) returning *', [req.body.first_name, req.body.last_name, req.body.uname, hash, salt]);

        res.status(201).json({
            status: "sign up complete"
        })

    } catch (err) {
        console.log(err);
    }
});

//login
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Login failed' });
  } else {
    res.status(200).json({ message: 'Login successful', user: req.user });
  }
});


module.exports = router;