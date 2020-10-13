const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/userdb-module');
const am = require('./view/alertMsg');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Filestore = require('session-file-store')(session);

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('1q2w3e4r5t6y'));
app.use(session({
    secret: '1q2w3e4r5t6y',     // keyboard cat
    resave: false,
    saveUninitialized: true,
    store: new Filestore({logFn: function(){}})
}));

app.get('/', (req, res) => {
    console.log(req.session.uid);
    if (!req.session.uid) { // 로그인 된 상태
        res.redirect('/login');
    } else {
        dm.getAllLists(rows => {
            const view = require('./view/sessionList');
            let html = view.mainForm(req.session.uname, rows);
            res.send(html);
        });
    }
});

app.get('/login', (req, res) => {
    const view = require('./view/userLogin');
    let html = view.loginForm();
    res.send(html);
});

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = dm.generateHash(pwd);
    dm.getUserInfo(uid, result => {
        if (result === undefined) {
            let html = am.alertMsg(`Log in 실패: uid ${uid}이/가 없습니다.`, '/login');
            console.log(`Log in 실패: uid ${uid}이/가 없습니다.`);
            res.send(html);
        } else {
            if (result.pwd === pwdHash) { // cookie 작업은 로그인 성공했을 때 해주는 것.
                req.session.uid = uid;
                req.session.uname = result.uname;
                console.log('로그인 성공');
                req.session.save(function() {
                    res.redirect('/');
                });

            } else {
                let html = am.alertMsg(`Log in 실패: 패스워드가 다릅니다.`, '/login');
                console.log(`Log in 실패: 패스워드가 다릅니다.`);
                res.send(html);
            }
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.listen(3000, () => {
    console.log('Server Running at http://127.0.0.1:3000');
});