const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

module.exports = {
    getConnection:  function() {
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

    // BBS DB
    getBbsTotalCount:     function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT count(*) FROM bbs where isDeleted=0;`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    
    getBbsList:     function(callback) {
        let conn = this.getConnection();

        let sql = `SELECT NO, uid, uname, tel, email FROM users;
        `;

        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },

    // 사용자 DB
    registerUser:     function(params, callback) {
        let conn = this.getConnection();
        let sql = `insert into users(uid, pwd, uname, tel, email) values(?,?,?,?,?);`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end(params);
    },

    getAllLists:     function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT NO, title, DATE_FORMAT(regDate, '%Y.%m.%d') AS regDate, bid, viewCount, reply FROM lists;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },

    writeUser:         function(params, callback) {
        let conn = this.getConnection();
        let sql = `insert into lists(bid, title, content, uid) values(?,?,?,?);`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end(params);
    },

    deleteUser:     function(uid, callback) {
        let conn = this.getConnection();
        let sql = `update list set isDeleted=1 where uid like ?;`;
        conn.query(sql, uid, (error,  fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}
