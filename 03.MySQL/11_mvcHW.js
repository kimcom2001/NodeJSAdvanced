const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/db-moduleHW');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    dm.getAllLists(rows => {
        const view = require('./view/listHW');
        let html = view.mainForm(rows);
        res.send(html);
    }); 
});

app.get('/insert', (req, res) => {
    const view = require('./view/insertHW');
    let html = view.insertForm();
    res.send(html);
});

app.post('/insert', (req, res) => {
    let name = req.body.name;
    let debut = req.body.debut;
    let params = [name, debut];

    dm.insertSong(params, () => {
        res.redirect('/');
    });
});

app.get('/delete/:sid', (req, res) => {
    let sid = parseInt(req.params.sid);
    console.log(sid);
    dm.deleteSong(sid, () => {
        res.redirect('/');
    });
});
// 1. date가져와서 Form 만들기 => 2. Form을 보여주기

app.get('/update/:sid', (req, res) => {
    let sid = parseInt(req.params.sid);
    dm.getSong(sid, result => {
        const view = require('./view/updateHW');
        let html = view.updateForm(result);
    res.send(html);
    });
});

// 정보가 들어올때는 body, 불러올때는 params

app.post('/update', (req, res) => {
    let sid = parseInt(req.body.sid);
    let name = req.body.name;
    let debut = req.body.debut;
    let params = [name, debut, sid];

    dm.updateSong(params, () => {
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server Running at http://127.0.0.1:3000');
});
