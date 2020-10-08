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

let sql = `SELECT con.continent, con.name AS Nation, cit.name AS City, cit.population
    FROM city AS cit
    inner join country AS con
    ON cit.countrycode = con.code
    WHERE con.continent = 'asia'
    ORDER BY cit.population desc
    LIMIT 10
`;
connection.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.continent, row.Nation, row.City, row.population); 
    };
});

connection.end();