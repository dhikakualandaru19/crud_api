const pgp = require('pg-promise')();

const db = pgp({
    user: 'postgres',
    host: 'localhost',
    database: 'crud_api',
    password: 'jubelio',
    port: 5432
});

module.exports = db;