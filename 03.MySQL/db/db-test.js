// db자료 확인용 - 사전에 미리 한번 확인 후 적용해야 안전하다.

const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('../mysql.json', 'utf8');
let config = JSON.parse(info);

function getConnection() {
    let conn = mysql.createConnection({
        host: config.host, 
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port
    });
    conn.connect(function(error) {
        if (error)
            console.log('mysql connection error :', + err);
    });
    return conn;
}

let sql = `delete from song where sid=?;`;
let conn = getConnection();
conn.query(sql, function(error, fields) {
    if (error)
        console.log(error);
});
conn.end();

// 뭐가 틀렸는지 확인하기 - 작동 안함

