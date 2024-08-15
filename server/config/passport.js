//This file is necessary for the strategy being used for authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db');
const validPassword = require('../lib/passwordUtils').validPassword;

const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
}

const verifyCallback = async (username, password, done) => {
    try {
        const {rows} = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = rows[0];

        if(!user) {
            return done(null, false, {message: 'Incorrect username'});
        }

        const isValid = validPassword(password, user.hashpassword, user.salt);
        
        if(isValid){
            return done(null, user);
        } else {
            return done(null, false, {message: 'Incorrect password'});
        }

    } catch(err) {
        console.log(err);
    }
}

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const {rows} = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        const user = rows[0];

        done(null, user, {message:`user ${user.id} retreived successfuly`});
    } catch(err) {
        console.log(err);
    }
});