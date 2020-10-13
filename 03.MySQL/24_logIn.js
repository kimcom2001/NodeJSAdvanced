const crypto = require('crypto');
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

function generateHash(something) {

    let shasum = crypto.createHash('sha256'); // sha256, sha512
    shasum.update(something);
    return shasum.digest('base64'); // hex, base64
}

// 사용자가 입력한 uid와 pwd를 각각 'admin', '1234'로 가정
let uid = 'admin'; // req.body.uid
let pwd = '1234'; // req.body.pwd
let pwdHash = generateHash(pwd);

let sql = `select * from users where uid like ?`;
conn.query(sql, uid, function(error, results, fields) {
    if (error)
        console.log(error);
    let result = results[0]

    if (result === undefined) { // sql에서 uid로 검색했기 때문에 undefined가 나오면 아이디가 없다는 것을 의미
        console.log(`Login 실패: uid ${uid}이/가 없습니다.`);
    } else {
        if (result.pwd === pwdHash) {
            console.log('로그인 성공');
        } else {
            console.log('Login 실패: 패스워드가 다릅니다.');
        }
    }
});

conn.end();