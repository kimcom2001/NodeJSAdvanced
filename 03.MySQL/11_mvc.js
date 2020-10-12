const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/db-module');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    dm.getJoinLists(rows => {
        const view = require('./view/join');
        let html = view.mainForm(rows);
        res.send(html);
    });
/*     dm.getAllLists(rows => {
        const view = require('./view/list');
        let html = view.mainForm(rows);
        res.send(html);
    });  */
});

app.get('/insert', (req, res) => {
    const view = require('./view/insert');
    let html = view.insertForm();
    res.send(html);
});

app.post('/insert', (req, res) => {
    let title = req.body.title; // 내용 추가를 위해 body-parser를 설치 후 사용하는 모습.
    let lyrics = req.body.lyrics;
    let params = [title, lyrics];

    dm.insertSong(params, () => {
        res.redirect('/'); // res.redirect는 요청을 새 URL로 리디렉션하고 새 URL로 지정하는 것을 의미.
    });
});

app.get('/delete/:sid', (req, res) => {
    let sid = parseInt(req.params.sid); // 클라이언트에서 요청을 했으므로 params로 sid를 호출해서 불러온다.
    dm.deleteSong(sid, () => {
        res.redirect('/');
    });
});

// 1. date가져와서 Form 만들기 => 2. Form을 보여주기

app.get('/update/:sid', (req, res) => {
    let sid = parseInt(req.params.sid);
    dm.getSong(sid, result => {
        const view = require('./view/update');
        let html = view.updateForm(result);
    res.send(html);
    });
});

// 정보가 들어올때는 body, 불러올때는 params

app.post('/update', (req, res) => {
    let sid = parseInt(req.body.sid); // 그 전에 삭제된 것이 있거나, 추가된 것이 있을 경우 변경된 값을 집어넣기 위해 body를 사용.
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let params = [title, lyrics, sid];

    dm.updateSong(params, () => {
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server Running at http://127.0.0.1:3000');
});
