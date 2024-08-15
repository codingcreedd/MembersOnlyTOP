const router = require('express').Router();
const db = require('../db');
const { genPassword } = require('../lib/passwordUtils');

router.post('/signup', async (req, res, next) => {
    try {
        const saltHash = genPassword(req.body.pw);

        const salt = saltHash.salt;
        const hash = saltHash.hash;

        await db.query('INSERT INTO users (firstname, lastname, username, hashpassword, salt) '
        + 'VALUES ($1, $2, $3, $4, $5)', [req.body.firstname, req.body.lastname, req.body.uname, hash, salt]);

    } catch (err) {
        console.log(err);
    }
});

//login
router.post('/login', async (req, res, next) => {

})

module.exports = router;