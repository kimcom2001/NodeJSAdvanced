const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // 상태 정보를 클라이언트에 저장
const session = require('express-session'); // 상태 정보를 웹 서버에 저장
const Filestore = require('session-file-store')(session);
const uRouter = require('./userRouter');


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

app.use('/user', uRouter);

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    fs.readFile('./view/userLogin.html', 'utf8', (error, html) => {
        res.send(html);
    });
});


app.listen(3000, () => {
    console.log('Server Running at http://127.0.0.1:3000');
});