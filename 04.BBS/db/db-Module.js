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

    // BBS DB
    getBbsTotalCount:     function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT count(*) as count FROM bbs where isDeleted=0;`;
        conn.query(sql, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);   // 주의할 것
        });
        conn.end();
    },

    getReplyData:     function(bid, callback) {
        let conn = this.getConnection();
        let sql = `SELECT r.rid, r.bid, r.uid, u.uname, r.content, r.isMine,
                    DATE_FORMAT(r.regTime, '%Y-%m-%d %T') as regTime
                    FROM reply AS r
                    JOIN users AS u
                    ON r.uid = u.uid
                    WHERE r.bid=?;`;
        conn.query(sql, bid, (error, replies, fields) => {
            if (error)
                console.log(error);
            callback(replies);
        });
        conn.end();
    },

    increaseViewCount:  function(bid, callback) {
        let conn = this.getConnection();
        let sql = `update bbs set viewCount=viewCount+1 where bid=?;`;
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    
    getBbsContent:      function(bid, callback) {
        let conn = this.getConnection();
        let sql = `
        SELECT b.bid, b.uid, u.uname, b.title, b.content, date_format(b.regDate, '%Y.%m.%d') AS regDate, b.viewCount, b.replyCount
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
        let sql = `SELECT b.bid, u.uname, b.title, DATE_FORMAT(b.regDate, '%Y.%m.%d') AS regDate, b.viewCount, b.replyCount
        FROM bbs AS b
        JOIN users AS u
        ON b.uid=u.uid
        WHERE b.isDeleted=0
        ORDER BY b.bid DESC 
        LIMIT 10;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },

    
    getCreateBbs:         function(params, callback) { 
        
        let conn = this.getConnection();
        let sql = `insert into bbs(title, content, uid) values(?,?,?);`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    getCreateReply:         function(params, callback) { 
        
        let conn = this.getConnection();
        let sql = `insert into reply(bid, uid, content, isMine) values(?,?,?,?);`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    getReplyCount:  function(bid, callback) {
        let conn = this.getConnection();
        let sql = `update bbs set replyCount=replyCount+1 where bid=?;`;
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    deleteBbs:     function(bid, callback) {
        let conn = this.getConnection();
        let sql = `update bbs set isDeleted=1 where bid=?;`;
        conn.query(sql, bid, (error,  fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    getBbsUpdateContent:      function(bid, callback) {
        let conn = this.getConnection();
        let sql = `
        SELECT bid, title, content from bbs where bid=?;`;
        conn.query(sql, bid, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);
        });
        conn.end();
    },

    getUpdateBbs:     function(params, callback) {

        let sql = `update bbs set title=?, content=? where bid=?;`;
        let conn = this.getConnection(); // 내부에 있으면 this를 사용해야 한다.
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    getReplyData:     function(bid, callback) {
        let conn = this.getConnection();
        let sql = `SELECT r.rid, r.bid, r.uid, u.uname, r.content, r.isMine,
                    DATE_FORMAT(r.regTime, '%Y-%m-%d %T') as regTime
                    FROM reply AS r
                    JOIN users AS u
                    ON r.uid = u.uid
                    WHERE r.bid=?;`;
        conn.query(sql, bid, (error, rows, fields) => {
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
    
    getUserInfo:    function(uid, callback) {
        let conn = this.getConnection();
        let sql = `SELECT * from users where uid=?;`;
        conn.query(sql, uid, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]); // 주의
        });
        conn.end();
    },

    getUserList:    function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT uid, uname, tel, email from users;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows); // 주의
        });
        conn.end();
    },

    getUpdateUser:     function(params, callback) {

        console.log(params);
        let sql = `update users set pwd=?, uname=?, tel=?, email=? where uid=?;`;
        let conn = this.getConnection(); // 내부에 있으면 this를 사용해야 한다.
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    getUserDelete:     function(uid, callback) {
        let conn = this.getConnection();
        let sql = `delete from users where uid=?;`;
        conn.query(sql, uid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
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
