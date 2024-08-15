const {Pool} = require('pg');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);

const pool = new Pool({});

const sessionStore = new pgSession({
    pool,
    tableName: 'session'
})

module.exports = {
    query: (text, params) => pool.query(text, params),
    sessionStore
}