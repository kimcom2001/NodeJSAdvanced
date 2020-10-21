const express = require('express');
const ut = require('./util');
const dm = require('./db/db-Module');
const am = require('./view/alertMsg');
const bRouter = express.Router();


bRouter.get('/list/:page',  ut.isLoggedIn, (req, res) => {  // 리스트 목록 - 완료
    
    dm.getBbsList(rows => {
    const view = require('./view/bbsList');
    let html = view.bbsListForm(req.session.uname, rows);
    res.send(html);
    });
});

bRouter.get('/content/:bid',  ut.isLoggedIn, (req, res) => {  // 리스트 내용 - 완료

    let uid = req.session.uid
    let bid = parseInt(req.params.bid);
    dm.getBbsContent(bid, result => {
        const view = require('./view/bbsContent');
        let html = view.contentForm(req.session.uname, bid, result);
        res.send(html);
    });
}); 

bRouter.get('/create/:uid', ut.isLoggedIn, (req, res) => {

    let uid = req.session.uid;
    const view = require('./view/bbsCreate');
    let html = view.createForm(req.session.uname, uid);
    res.send(html);
});

bRouter.post('/create/:uid', ut.isLoggedIn, (req, res) => {
    
    let uid = req.params.uid;
    let title = req.body.title;
    let content = req.body.content;
    let params = [title, content, uid];
    dm.getCreateUser(params, () => {
        res.redirect('/bbs/list/:uid');
    });
});

bRouter.get('/delete/:bid', ut.isLoggedIn, (req, res) => {
    
    let bid = parseInt(req.params.bid);
    console.log(req.params.uid);
    console.log(req.session.uid);
    if (req.params.uid === req.session.uid) {
        dm.deleteUser(bid, req.session.uid, () => {
            res.redirect('/bbs/list/:page');
        });
    } else {
        let html = am.alertMsg(`삭제 권한이 없습니다.`, '/bbs/list/:page'); // 로그인은 이미 되어 있으므로 루트로 보내준다.
        res.send(html);
        console.log(html)
    }
});

/* bRouter.get('/update/:uid', ut.isLoggedIn, (req, res) => {
    let uid = req.params.uid;
    if (req.params.uid === req.session.uid) { // 로그인한 사용자의 한에서 권한 부여
        dm.getUserInfo(req.params.uid, (result) => {
            const view = require('./view/bbsUpdate');
            html = view.updateForm(req.prams.uid, result);
            res.send(html);
        });
    } else {
        let html = am.alertMsg(`수정 권한이 없습니다.`, '/'); // 로그인은 이미 되어 있으므로 루트로 보내준다.
        res.send(html);
    }
});

bRouter.post('/update', ut.isLoggedIn, (req, res) => {
    let bid = req.body.bid;
    let title = req.body.title;
    let content = req.body.content;
    let params = [bid, title, content];
        dm.updateUser(params, () => {
            res.redirect('/');
    });
}); */

module.exports = bRouter;

