const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let conInfo = JSON.parse(info); 


let connection = mysql.createConnection({
    host: conInfo.host, 
    user: conInfo.user,
    password: conInfo.password,
    database: conInfo.database,
    port: conInfo.port
});

connection.connect();

let sql = 'select * from city where population > 9000000';
connection.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.ID, row.Name, row.CountryCode, row.District, row.Population);
    };
});

connection.end();