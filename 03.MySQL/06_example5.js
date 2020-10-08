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

let sql = `SELECT lng.language, cit.name, cit.population
FROM city AS cit
INNER JOIN countrylanguage AS lng
ON lng.countrycode = cit.countrycode
WHERE lng.isofficial = 'T'
ORDER BY cit.population DESC
LIMIT 10
`;
connection.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.language, row.name, row.population);
        // MySQL에서 목록의 값을 console.log 값 안에 두면 cmd에 표시 가능
    };
});

connection.end();