const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

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
        let sql = `SELECT girl_group.sid, girl_group.name, date_format(girl_group.debut, '%Y-%m-%d') AS debut FROM girl_group ORDER BY sid DESC LIMIT 10;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },

    insertSong:     function(params, callback) {
        let sql = `insert into girl_group(name, debut) values(?, ?);`;
        let conn = this.getConnection(); // 내부에 있으면 this를 사용해야 한다.
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    deleteSong:     function(sid, callback) {
        let sql = `delete from girl_group where sid=?;`;
        let conn = this.getConnection(); // 내부에 있으면 this를 사용해야 한다.
        conn.query(sql, sid, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    getSong:     function(sid, callback) {
        let sql = `SELECT * from girl_group where sid=?;`;
        let conn = this.getConnection(); // 내부에 있으면 this를 사용해야 한다.
        conn.query(sql, sid, function(error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows[0]); // 주의해야한다. 그냥 row로 부르면 array형태로 온다.
        });
        conn.end();
    },

    updateSong:     function(params, callback) {
        let sql = `update girl_group set name=?, debut=? where sid=?;`;
        let conn = this.getConnection(); // 내부에 있으면 this를 사용해야 한다.
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}



