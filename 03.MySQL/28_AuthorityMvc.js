const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/userdb-module');
const am = require('./view/alertMsg');
const cookieParser = require('cookie-parser'); // 상태 정보를 클라이언트에 저장
const session = require('express-session'); // 상태 정보를 웹 서버에 저장
const Filestore = require('session-file-store')(session);
const ut = require('./28_util');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('1q2w3e4r5t6y'));
app.use(session({
    secret: '1q2w3e4r5t6y',     // 비밀 키를 저장
    resave: false,  // 재저장을 계속 할 것인지에 대한 옵션(세션에 변동이 있든 없든 무조건 저장하겠다는 옵션)
    saveUninitialized: true,    // 세션이 세션 store에 저장되기 전에 uninialized된 상태로 만들어서 저장
    store: new Filestore({logFn: function(){}})
}));

app.get('/', ut.isLoggedIn, (req, res) => {
    dm.getAllLists(rows => {
        const view = require('./view/authorityList');
        let html = view.mainForm(req.session.uname, rows); // (req.session.uname)님 환영합니다를 위해 넣어줌.
        res.send(html);
    });
});

app.get('/delete/:uid', ut.isLoggedIn, (req, res) => {
    if (req.params.uid === req.session.uid) { // 로그인한 사용자의 한에서 권한 부여
        dm.deleteUser(req.params.uid, () => {
            res.redirect('/');
        });
    } else {
        let html = am.alertMsg(`삭제 권한이 없습니다.`, '/'); // 로그인은 이미 되어 있으므로 루트로 보내준다.
        res.send(html);
    }
});

app.get('/update/:uid', ut.isLoggedIn, (req, res) => {
    if (req.params.uid === req.session.uid) { // 로그인한 사용자의 한에서 권한 부여
        dm.getUserInfo(req.params.uid, (result) => {
            const view = require('./view/userUpdate');
            html = view.updateForm(result);
            res.send(html);
        });
    } else {
        let html = am.alertMsg(`수정 권한이 없습니다.`, '/'); // 로그인은 이미 되어 있으므로 루트로 보내준다.
        res.send(html);
    }
});

app.post('/update', ut.isLoggedIn, (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let pwdHash = ut.generateHash(pwd);
    if(pwd === pwd2) {          // 패스워드와 패스워드 확인이 같은 경우, 피시방의 경우 현재 비밀번호 확인을 한번 더 한다.
        let params = [pwdHash, uid];
        dm.updateUser(params, () => {
            res.redirect('/');
        });
    } else {            // 패스워드 입력이 잘못된 경우
        let html = am.alertMsg(`변경 실패: 패스워드가 일치하지 않습니다.`, `/update/${uid}`);
        res.send(html);
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
                    res.redirect('/');
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