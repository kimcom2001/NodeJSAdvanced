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
    
    getBbsContent:      function(bid, callback) {
        let conn = this.getConnection();
        let sql = `
        SELECT b.bid, b.uid, u.uname, b.title, b.content, date_format(b.regDate, '%Y.%m.%d') AS regDate
        FROM bbs AS b
        JOIN users AS u
        ON b.uid=u.uid
        where bid=?;
        `;
        conn.query(sql, bid, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);
        });
        conn.end();
    },

    getBbsList:     function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT b.bid, u.uname, b.title, DATE_FORMAT(b.regDate, '%Y.%m.%d') AS regDate
        FROM bbs AS b
        JOIN users AS u
        ON b.uid=u.uid
        WHERE u.isDeleted=0
        ORDER BY b.bid DESC 
        LIMIT 10;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },

    
    getCreateUser:         function(params, callback) { 
        
        let conn = this.getConnection();
        let sql = `insert into bbs(title, content, uid) values(?,?,?);`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end(params);
    },

    deleteUser:     function(bid, callback) {
        let conn = this.getConnection();
        let sql = `update bbs set isDeleted=1 where bid like ?;`;
        conn.query(sql, bid, (error,  fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    getUpdateUser:     function(params, callback) {
        let sql = `update lists set bid=?, title=?, content=? where uid=?;`;
        let conn = this.getConnection(); // 내부에 있으면 this를 사용해야 한다.
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end(params);
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
        let sql = `SELECT b.NO AS NO, b.bid AS bid, b.uid AS uid, u.uname AS uname, b.title AS title, b.content AS content, DATE_FORMAT(b.regDate, '%Y.%m.%d') AS regDate
        FROM bbs AS b
        JOIN users AS u
        ON b.uid=u.uid
        WHERE u.isDeleted=0
        ORDER BY b.bid DESC 
        LIMIT 10;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },


}
