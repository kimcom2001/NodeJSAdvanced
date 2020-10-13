const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/userdb-module');
const am = require('./view/alertMsg');
const app = express();
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req.cookies);
    if (req.cookies && req.cookies.isLoggedIn) { // 로그인 된 상태면 DB목록 보여주기.
        dm.getAllLists(rows => {
            const view = require('./view/cookieList');
            let html = view.mainForm(rows);
            res.send(html);
        });
    } else {    // 로그인이 안된 상태라면 로그인창으로 이동.
        res.redirect('/login');
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
            let html = am.alertMsg(`Log in 실패: uid ${uid}이/가 없습니다.`, '/login'); // returnUrl이 '/login'을 받아서 그곳으로 돌아간다.
            console.log(`Login 실패: uid ${uid}이/가 없습니다.`);
            res.send(html);
        } else {
            if (result.pwd === pwdHash) { // cookie 작업은 로그인 성공했을 때 해주는 것.
                res.cookie(`isLoggedIn`, 1);
                console.log('로그인 성공');
                res.redirect('/');
            } else {
                let html = am.alertMsg(`Log in 실패: 패스워드가 다릅니다.`, '/login');
                console.log(`Login 실패: 패스워드가 다릅니다.`);
                res.send(html);
            }
        }
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie(`isLoggedIn`);
    res.redirect('/login');
});

app.listen(3000, () => {
    console.log('Server Running at http://127.0.0.1:3000');
});