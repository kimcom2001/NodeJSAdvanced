const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // 상태 정보를 클라이언트에 저장
const session = require('express-session'); // 상태 정보를 웹 서버에 저장
const Filestore = require('session-file-store')(session);
const uRouter = require('./userRouter');
const bRouter = require('./bbsRouter');
const dm = require('./db/db-Module');
const ut = require('./util');
const app = express();

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/@popperjs/core/dist/umd'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/css'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('1q2w3e4r5t6y'));
app.use(session({
    secret: '1q2w3e4r5t6y',     // 비밀 키를 저장
    resave: false,  // 재저장을 계속 할 것인지에 대한 옵션(세션에 변동이 있든 없든 무조건 저장하겠다는 옵션)
    saveUninitialized: true,    // 세션이 세션 store에 저장되기 전에 uninialized된 상태로 만들어서 저장
    store: new Filestore({logFn: function(){}})
}));

app.use('/user', uRouter); // 여기서 시작함
app.use('/bbs', bRouter); // 여기서 시작함

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    const view = require('./view/userLogin');
    let html = view.loginForm();
    res.send(html);
});

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = ut.generateHash(pwd);
    dm.getUserInfo(uid, result => {
        if (result === undefined) {
            let html = am.alertMsg(`Log in 실패: uid ${uid}이/가 없습니다.`, '/login');
            res.send(html);
        } else {
            if (result.pwd === pwdHash) { // cookie 작업은 로그인 성공했을 때 해주는 것.
                req.session.uid = uid; // 권한을 부여하기 위함.
                req.session.uname = result.uname; // {}님 반갑습니다를 위함.
                console.log('로그인 성공');
                req.session.save(function() {
                    res.redirect('/user/list');
                });

            } else {
                let html = am.alertMsg(`Log in 실패: 패스워드가 다릅니다.`, '/login');
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