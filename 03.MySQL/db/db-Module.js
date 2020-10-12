const mysql = require('mysql');
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
        let sql = `SELECT * FROM song ORDER BY sid DESC LIMIT 5;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },

    getJoinLists:     function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT song.sid, song.title, gg.name, song.lyrics FROM song LEFT JOIN girl_group AS gg ON song.sid=gg.hit_song_id ORDER BY song.sid DESC LIMIT 10;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },

    insertSong:     function(params, callback) {
        let sql = `insert into song(title, lyrics) values(?, ?);`;
        let conn = this.getConnection(); // 내부에 있으면 this를 사용해야 한다.
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    deleteSong:     function(sid, callback) {
        let sql = `delete from song where sid=?;`;
        let conn = this.getConnection(); // 내부에 있으면 this를 사용해야 한다.
        conn.query(sql, sid, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    getSong:     function(sid, callback) {
        let sql = `SELECT * from song where sid=?;`;
        let conn = this.getConnection(); // 내부에 있으면 this를 사용해야 한다.
        conn.query(sql, sid, function(error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows[0]); // 주의해야한다. 그냥 row로 부르면 array형태로 온다. 수정을 눌렀을 경우 그것이 나와야 하므로 rows[0]으로 표시해야한다.
        });
        conn.end();
    },

    updateSong:     function(params, callback) {
        let sql = `update song set title=?, lyrics=? where sid=?;`;
        let conn = this.getConnection(); // 내부에 있으면 this를 사용해야 한다.
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}



