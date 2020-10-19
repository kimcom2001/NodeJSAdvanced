const mysql = require('mysql');
const crypto = require('crypto');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info); // parse 메소드는 string 객체를 json 객체로 변환시켜 준다.

module.exports = {
    getConnection: function() {
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
    },

    getAllLists:     function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT uid, uname, DATE_FORMAT(regDate, '%Y-%m-%d %T') AS regDate 
        from users WHERE isDeleted=0
        ORDER BY regDate LIMIT 10;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },

    getUserInfo:    function(uid, callback) {
        let conn = this.getConnection();
        let sql = `SELECT * from users where uid like ?;`;
        conn.query(sql, uid, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]); // 주의
        });
        conn.end();
    },

    generateHash:   function(something) {
        let shasum = crypto.createHash('sha256'); // sha256, sha512
        shasum.update(something);
        return shasum.digest('base64');
    },

    deleteUser:     function(uid, callback) {
        let conn = this.getConnection();
        let sql = `update users set isDeleted=1 where uid like ?;`;
        conn.query(sql, uid, (error,  fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    updateUser:     function(params, callback) { // 여러개를 받아야 하므로 params 사용
        let conn = this.getConnection();
        let sql = `update users set pwd=? where uid like ?;`;
        conn.query(sql, params, (error,  fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}
