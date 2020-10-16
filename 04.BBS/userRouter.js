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
    let html = view.writeForm();
    res.send(html);
});

uRouter.post('/write', (req, res) => {
    
    let uid = req.session.uid;
    let title = req.body.title;
    let content = req.body.content;
    let params = [uid, title, content];
        dm.writeUser(params, () => {
            res.redirect('/');
    });
});




module.exports = uRouter;