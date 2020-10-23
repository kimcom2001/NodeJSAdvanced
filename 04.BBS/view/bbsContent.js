const template = require('./template');

module.exports.contentForm = function(uname, result, replies) {
    
    let content = result.content.replace(/\n/g, '<br>');
    let cards = '';
    for (let reply of replies) {
        cards += (reply.isMine == 0) ?
                `<div class="card bg-light text-dark mt-1" style="margin-right: 45%;">` :
                `<div class="card text-right mt-1" style="margin-left: 60%;">`;
        cards += `
                    <div class="card-body">
                        ${reply.uname}&nbsp;&nbsp;${reply.regTime}<br>
                        ${reply.content.replace(/\r/g, '<br>')}
                    </div>
                </div>`;
    }
        return`

<!DOCTYPE html>
<html lang="ko">
<head>
    <title>My BBS</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css"> 
    <link rel="stylesheet" href="/fontawesome-free-5.15.1-web/css/all.min.css">
    <script src="/jquery/jquery.min.js"></script>
    <script src="/popper/popper.min.js"></script>
    <script src="/bootstrap/js/bootstrap.min.js"></script>
</style>
</head>
<body>
    <div style="margin-top: 80px"></div>
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <a class="navbar-brand" href="#">
            <img src="/img/hoseo.png" alt="호서직업능력개발원"
                style="height: 40px; margin-left: 50px; margin-right: 100px;">
        </a>
        <ul class="nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/bbs/list/:page"><i class="fas fa-home"></i>&nbsp;홈</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/bbs/create/:uid"><i class="fas fa-edit"></i>&nbsp;새글</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/user/list"><i class="far fa-user"></i>&nbsp;유저정보</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/logout">로그아웃</a>
            </li>
        </ul>
        <div class="navbar-text fixed-right" id="weather">
            ${uname}님 반갑습니다.&nbsp;&nbsp;&nbsp;&nbsp;
        <i class="fas fa-cloud-sun"></i> 20&deg;C
        </div>
    </nav>
        <div class="container">
            <div class="row">
                <div class="col-1"></div>
                <div class="col-7">
                    <h3>${result.title}</h3>
                    <p><span>글번호: ${result.bid}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>날짜: ${result.regDate}</span></p>
                </div>
                <div class="col-3">
                    <h3>${result.uname}</h3>
                    <p><span>조회 ${result.viewCount}</span>&nbsp;&nbsp;<span>리플 ${result.replyCount}</span></p>
                </div>
                <div class="col-1"></div>
            </div>
            <hr>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-9">
                    <p>${result.content}</p>
                </div>
                <div class="col-2">
                    <a href="/bbs/update/${result.bid}/uid/${result.uid}">수정</a>
                    <a href="/bbs/delete/${result.bid}/uid/${result.uid}">삭제</a>
                </div>
            </div>
        </div>
            <hr>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-9">
                    ${cards}
                    <form class="form-inline" action="/bbs/reply/${result.uid}/bid/${result.bid}" method="post">
                        <input type="hidden" name="bid" value="${result.bid}">
                        <input type="hidden" name="uid" value="${result.uid}">
                        <label for="content" class="ml-5 mt-3 mr-3">댓글</label>
                        <textarea class="ml-3 mt-3 mr-3" id="content" name="content" rows="3" cols="80"></textarea>
                        <button type="submit" class="btn btn-primary ml-3 mt-3 mr-5">등록</button>
                    </form>
                </div>
                <div class="col-1"></div>
            </div>
        </div>
    </div>
    </form>
    

    ${template.footer()}


`;
}