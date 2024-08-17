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
    console.log(req.session)
    res.status(200).json({ message: 'Login successful', user: req.session.passport.user });
  }
});

router.get('/', (req, res) => {
    console.log('Log App');
    res.status(200).json({message: 'Ran App'})
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        if(req.isAuthenticated()){
            const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
            res.status(200).json({
                status: 'retreived user successfully',
                data: {
                    user: user.rows[0],
                    authenticated: true
                }
            })
        } else {
            res.status(200).json({
                message: 'User not authenticated',
                authenticated: false
            })
        }
    } catch(err) {
        console.log(err);
    }
})

// //authentication endpoint
// router.get('/auth-check', (req, res) => {
//     if (req.session.user) {
//         res.status(200).json({ authenticated: true, user: req.session.user });
//     } else {
//         res.status(401).json({ authenticated: false });
//     }
// });

//logout
router.get('/logout/user-logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); // Handle the error if something goes wrong during logout
        }
        res.status(200).json({
            message: 'Logged out successfully'
        });

        if(req.session.passport) {
            console.log(req.session.passport);
        } else {
            console.log(req.session);
        }
    });
});



module.exports = router;