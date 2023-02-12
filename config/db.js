const mysql = require('mysql2')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Bank',
    password: '',
    multipleStatements: true
}).promise();
module.exports = conn