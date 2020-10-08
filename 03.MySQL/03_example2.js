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
SELECT g.name AS name,
    date_format(g.debut, '%Y-%M-%D') AS debuDate,
    s.title AS songTitle
	FROM girl_group AS g
	JOIN song AS s ON s.sid = g.hit_song_id
    where debut BETWEEN '2009-01-01' AND '2009-12-31'
    ORDER BY debut;
`;
connection.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.NAME, row.debutDate, row.songTitle); 
    };
});

connection.end();