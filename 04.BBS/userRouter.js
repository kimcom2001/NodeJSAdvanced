const express = require('express');
const ut = require('./util');
const dm = require('./db/db-Module');
const alert = require('./view/alertMsg');
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
        let html = alert.alertMsg('패스워드가 다릅니다.', '/user/register');
        res.send(html);
    } else {
        let pwdHash = ut.generateHash(pwd);
        let params = [uid, pwdHash, uname, tel, email];
        dm.registerUser(params, () => {
            res.redirect('/login');
        });
    }
});

uRouter.get('/write', (req, res) => {
    const view = require('./view/userWrite');
    let html = view.writeForm(req.session.uname);
    res.send(html);
});

uRouter.post('/write', (req, res) => {
    
    let bid = req.body.bid;
    let uid = req.session.uid;
    let title = req.body.title;
    let content = req.body.content;
    let params = [bid, title, content, uid];
    dm.writeUser(params, () => {
        res.redirect('/');
    });
});

uRouter.get('/list', (req, res) => {

    dm.getAllLists(rows => {
        const view = require('./view/userList');
        let html = view.listForm(req.session.uname, rows);
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


module.exports = uRouter;