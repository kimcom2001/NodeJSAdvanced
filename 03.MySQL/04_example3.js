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

let sql = `SELECT continent, COUNT(*) AS countCont, round(SUM(gnp)) AS sumCont, 
round(AVG(gnp)) AS avgCont FROM country 
GROUP BY continent;
`;
connection.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.continent, row.countCont, row.sumCont, row.avgCont); 
    };
});

connection.end();