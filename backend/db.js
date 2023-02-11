const { Pool } = require("pg");

const pool = new Pool({
    user: 'viditgoel',
    host: 'localhost',
    database: 'iitbasc',
    password: 'vidit123',
    port: 5432,
});

module.exports = pool