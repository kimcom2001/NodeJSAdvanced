const express = require('express');
const ut = require('./util');
const dm = require('./db/db-module');
const am = require('./view/alertMsg');
const uRouter = express.Router();

uRouter.get('/register', (req, res) => {
    const view = require('./view/userRegister');
    let html = view.registForm();
    res.send(html);
});

uRouter.post('/register', (req, res) => {
    
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email;
    if (pwd !== pwd2) {
        let html = am.alertMsg('패스워드가 다릅니다.', '/user/register');
        res.send(html);
    } else {
        let pwdHash = ut.generateHash(pwd);
        let params = [uid, pwdHash, uname, tel, email];
        dm.registerUser(params, () => {
            res.redirect('/login');
        });
    }
});

uRouter.get('/list',  ut.isLoggedIn, (req, res) => {  
    
    dm.getUserList(rows => {
    const view = require('./view/userList');
    let html = view.userListForm(req.session.uname, rows);
    res.send(html);
    });
});

uRouter.get('/update/uid/:uid', ut.isLoggedIn, (req, res) => {
    
    if (req.params.uid === req.session.uid) { // 로그인한 사용자의 한에서 권한 부여
        dm.getUserInfo(req.session.uid, (result) => {
            const view = require('./view/userUpdate');
            html = view.updateForm(result);
            res.send(html);
        });
    } else {
        let html = am.alertMsg(`수정 권한이 없습니다.`, '/bbs/list/:page'); // 로그인은 이미 되어 있으므로 루트로 보내준다.
        res.send(html);
    }
});

uRouter.post('/update/uid/:uid', ut.isLoggedIn, (req, res) => {
  
    let uid = req.params.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let pwdHash = ut.generateHash(pwd);
    let tel = req.body.tel;
    let email = req.body.email;
    if(pwd === pwd2) {          // 패스워드와 패스워드 확인이 같은 경우, 피시방의 경우 현재 비밀번호 확인을 한번 더 한다.
        let params = [pwdHash, uname, tel, email, uid];
        dm.getUpdateUser(params, () => {
            res.redirect('/');
        });
    } else {            // 패스워드 입력이 잘못된 경우
        let html = am.alertMsg(`변경 실패: 패스워드가 일치하지 않습니다.`, `/update/${uid}`);
        res.send(html);
    }
});


module.exports = uRouter;