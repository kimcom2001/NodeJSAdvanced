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

bRouter.post('/reply/:uid/bid/:bid', ut.isLoggedIn, (req, res) => {

    let bid = parseInt(req.params.bid);
    let uid = req.session.uid;
    let content = req.body.content;
    let isMine = (uid === req.body.uid) ? 1 : 0;
    let params = [bid, uid, content, isMine];
    dm.getCreateReply(params, () => {
        dm.getReplyCount(bid, () => {
        res.redirect(`/bbs/content/${bid}`)
        });
    });
});

bRouter.get('/content/:bid',  ut.isLoggedIn, (req, res) => {  // 리스트 내용 - 완료

    let bid = parseInt(req.params.bid);
    dm.getBbsContent(bid, result => {
        dm.increaseViewCount(bid, () => {
            dm.getReplyData(bid, reply => {
                const view = require('./view/bbsContent');
                let html = view.contentForm(req.session.uname, result, reply);
                res.send(html);
            });
        });
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
    dm.getCreateBbs(params, () => {
        res.redirect('/bbs/list/:page');
    });
});

bRouter.get('/delete/:bid/uid/:uid', ut.isLoggedIn, (req, res) => {
 
    let bid = parseInt(req.params.bid);
    if (req.params.uid === req.session.uid) {
        let view = require('./view/bbsDelete');
        let html = view.delete(bid);
        res.send(html);
    } else {
        let html = am.alertMsg(`삭제 권한이 없습니다.`, '/bbs/list/:page'); // 로그인은 이미 되어 있으므로 루트로 보내준다.
        res.send(html);
    }
});

bRouter.get('/deleteConfirm/:bid', ut.isLoggedIn, (req, res) => {
    
    let bid = req.params.bid;
    dm.deleteBbs(bid, () => {
        res.redirect('/bbs/list/:page');
    });
});






bRouter.get('/update/:bid/uid/:uid', ut.isLoggedIn, (req, res) => {
    
    let bid = parseInt(req.params.bid);
    if (req.params.uid === req.session.uid) { // 로그인한 사용자의 한에서 권한 부여
        dm.getBbsUpdateContent(bid, (result) => {
            const view = require('./view/bbsUpdate');
            html = view.updateForm(req.params.uname, result);
            res.send(html);
        });
    } else {
        let html = am.alertMsg(`수정 권한이 없습니다.`, '/'); // 로그인은 이미 되어 있으므로 루트로 보내준다.
        res.send(html);
    }
});

bRouter.post('/update/:bid/uid/:uid', ut.isLoggedIn, (req, res) => {
  
    let bid = parseInt(req.params.bid); // req.body.bid로 하면 /update/:bid/uid/:uid에서 /update로 간결하게 쓸 수 있다.
    let title = req.body.title;
    let content = req.body.content;
    let params = [title, content, bid];
        dm.getUpdateBbs(params, () => {
            res.redirect('/bbs/list/:page');
    });
});

module.exports = bRouter;

