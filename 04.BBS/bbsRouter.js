const express = require('express');
const ut = require('./util');
const dm = require('./db/db-module');
const alert = require('./view/alertMsg');
const bRouter = express.Router();


bRouter.get('/list', (req, res) => {

    dm.getBbsList(rows => {
        const view = require('./view/bbsList');
        let html = view.listForm(rows);
        res.send(html);
    });
}); 


module.exports = bRouter;

