const $mysql = require('mysql');

const $db = $mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'tempdb'
});



module.exports = $db;