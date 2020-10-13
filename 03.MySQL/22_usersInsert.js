const crypto = require('crypto'); // crypto의 역할은 비밀번호를 암호화시켜 보안이 가능하다.
const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
let conn = mysql.createConnection({
    host:   config.host,
    user:   config.user,
    password:   config.password,
    database:   config.database,
    port:   config.port
});

conn.connect();

let shasum = crypto.createHash('sha256'); // sha256, sha512
shasum.update('1234');
let output = shasum.digest('base64');

// values 뒤 괄호 안에 ?의 사이에 ''('?')를 붙이면 DB에 ?로 저장이 된다.
let sql = `insert into users(uid, pwd, uname) values(?, ?, ?);`;
let params = ['sylee', output, '이수연'];
conn.query(sql, params, function(error, fields) {
    if (error)
        console.log(error);
});

conn.end();