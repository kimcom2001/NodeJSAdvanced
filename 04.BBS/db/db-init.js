const fs = require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('./mysql.json', 'utf8');
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
            console.log('mysql connection error :' + error);
    });
    return conn;
}

/* let sqlUsers = `
CREATE TABLE if not exists users(
    `uid` VARCHAR(20) NOT NULL,
    `pwd` CHAR(44) NOT NULL,
    `uname` VARCHAR(20) NOT NULL,
    `tel` VARCHAR(20),
    `email` VARCHAR(40),
    `regDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `isDeleted` INT DEFAULT 0,
    PRIMARY KEY (uid)
    );
`;
let conn = getConnection();
conn.query(sqlUsers, function(error, fields) {
    if (error)
        console.log(error);
});
conn.end(); */

/* let users = [
    ['admin4', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', '이우정', '010-3456-7890', 'wjlee@hoseo.com'],
    ['admin5', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', '대조영', '010-2323-7878', 'djy@korea.com'],
    ['admin6', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', '홍길동', '010-9898-4567', 'gdhong@korea.com'],
    ['admin7', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', '홍길동', '010-9898-4567', 'gdhong@korea.com'],
    ['admin8', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', '홍길동', '010-9898-4567', 'gdhong@korea.com'],
    ['admin9', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', '홍길동', '010-9898-4567', 'gdhong@korea.com'],
    ['admin', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', '홍길동', '010-9898-4567', 'gdhong@korea.com'],
    ['rladudwnd', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', '홍길동', '010-9898-4567', 'gdhong@korea.com'],
    ['kimcom2001', '96d6TkMkQ5sN8eQ34fwSQh2dw5noO08cKA/PQkwLZ/k=', '홍길동', '010-9898-4567', 'gdhong@korea.com']
];
let sqlRegister = `insert into users(uid, pwd, uname, tel, email) values(?,?,?,?,?);`;

let conn = getConnection();
for (let params of users) {
    conn.query(sqlRegister, params, function(error, fields) {
        if (error)
            console.log(error);
    });
}
conn.end(); */

/* let sqlBbs = `
CREATE TABLE if not exists bbs(
    `bid` INT NOT NULL AUTO_INCREMENT,
    `title` CHAR(100) NOT NULL,
    `content` VARCHAR(1000) NOT NULL,
    `uid` VARCHAR(20) NOT NULL,
    `regDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `isDeleted` INT DEFAULT 0,
    PRIMARY KEY (`bid`)
 ) AUTO_INCREMENT=1001;
`;
let conn = getConnection();
conn.query(sqlBbs, function(error, fields) {
    if (error)
        console.log(error);
});
conn.end(); */

/* let bbsArray = [
    ['admin', 'admin 제목', `admin이 작성한 내용`],
    ['admin', 'admin4 제목', `admin4이 작성한 내용`],
    ['admin', 'admin5 제목', `admin5이 작성한 내용`],
    ['admin', 'admin6 제목', `admin6이 작성한 내용`],
    ['admin', 'admin7 제목', `admin7이 작성한 내용`],
    ['admin', 'admin8 제목', `admin8이 작성한 내용`],
    ['admin', 'admin9 제목', `admin9이 작성한 내용`],
    ['admin', '게시글 작성', `
지난 월요일 독감 백신을 맞은 서울 강남구의 84살 남성이 숨졌습니다. 파킨슨병으로 재활병원에 입원 중이었는데 접종 이후 건강 상태가 악화된 것으로 전해졌습니다. [서울시 관계자] "(백신 접종 후) 기력이 없고 가래가 있었다고 나와요. 동일 병원에서 같은 시간대 동일 백신을 여러 명이 맞았을텐데 그분들의 상태를 계속 저희들이 모니터링하려고 합니다." 독감 백신을 접종한 뒤 사망한 사례는 서울과 인천, 경북과 전북 등 전국 각지에서 잇따랐습니다. 전남 순천의 81살 남성은 집 근처 의원에서 접종을 받은 지 72시간 만에 사망했습니다. [순천소방서 관계자] "의식하고 호흡이 없다고…흉통을 호소한 다음에 화장실에서 쓰러졌다고…(신고가 들어왔습니다.)" 또 경남 통영에선 백신을 맞았던 78살 남성이 목욕탕 온탕에서 숨진 채 발견됐습니다.`],
    ['admin', '새글(수정)', `새글(수정)`]


];
let sqlInsert = `insert into bbs(title, content, uid) values(?,?,?);`;

let conn = getConnection();
for (let params of bbsArray) {
    conn.query(sqlInsert, params, function(error, fields) {
        if (error)
            console.log(error);
    });
}
conn.end(); */

/* let replyBbs = `
CREATE TABLE if not exists reply(
    `rid` INT NOT NULL AUTO_INCREMENT,
    `bid` INT NOT NULL
    `uid` VARCHAR(20) NOT NULL
    `content` VARCHAR(100),
    `regTime` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `isMine` INT DEFAULT 0
    );
`;
let conn = getConnection();
conn.query(replyBbs, function(error, fields) {
    if (error)
        console.log(error);
});
conn.end(); */

/* let replyArray = [

];
let sqlInsertReply = `insert into reply(bid, uid, content, isMine) values(?,?,?,?);`;

let conn = getConnection();
for (let params of replyArray) {
    conn.query(sqlInsertReply, params, function(error, fields) {
        if (error)
            console.log(error);
    });
}
conn.end(); */

