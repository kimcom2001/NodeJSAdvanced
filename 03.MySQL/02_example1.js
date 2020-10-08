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

let sql = `
SELECT NAME, DATE_FORMAT(debut, '%Y-%M-%D') as debutDate FROM girl_group
    WHERE debut BETWEEN '2009-01-01' AND '2009-12-31';
`;
connection.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.NAME, row.debutDate); 
        // DB자료와 KEY값이 정확히 일치해야한다, 대소문자도 구별해야함
    };
});

connection.end();