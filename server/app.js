require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./db');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const crypto = require('crypto');

const sessionStore = db.sessionStore;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

//passport
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

//routes
const logs = require('./routes/logs');

app.use('/logs', logs);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})