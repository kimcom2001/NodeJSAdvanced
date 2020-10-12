// db자료 확인용 - 사전에 미리 한번 확인 후 적용해야 안전하다.

const fs = require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('../mysql.json', 'utf8');
let config = JSON.parse(info);

function getConnection() {
    let conn = mysql.createConnection({
        host:   config.host,
        user:   config.user,
        password:   config.password,
        database:   config.database,
        port:   config.port
    });
    conn.connect(function(error) {
        if (error) 
            console.log('mysql connection error :' + err);
    });
    return conn;
}

/* let sql = `SELECT song.sid, song.title, gg.name, song.lyrics FROM song
left JOIN girl_group AS gg
ON song.sid=gg.hit_song_id
ORDER BY song.sid DESC
LIMIT 10;`;
let conn = getConnection();
conn.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    console.log(rows);
});
conn.end(); */

let sql = `select * from song where sid=?;`;
let conn = getConnection();
conn.query(sql, 112, function(error, rows, fields) {
    if (error)
        console.log(error);
    console.log(rows[0]);
});
conn.end();

/* let sql = `delete from song where sid=?;`;
let conn = getConnection();
conn.query(sql, 114, function(error, fields) {
    if (error)
        console.log(error);
});
conn.end(); */

// 뭐가 틀렸는지 확인하기 - 작동 안함

