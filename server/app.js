require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./db');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');

const sessionStore = db.sessionStore;

//middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true, 
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true, 
        secure: false 
    }
}));


app.use(express.json());
app.use(express.urlencoded({extended: true}));


//passport
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    next();
})

//routes
const logs = require('./routes/logs');
const messages = require('./routes/messages');

app.use('/logs', logs);
app.use('/messages', messages);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})