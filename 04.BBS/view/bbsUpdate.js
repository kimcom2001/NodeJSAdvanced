const template = require('./template');

module.exports.updateForm = function(uname, result) {

    return `
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
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <a class="navbar-brand" href="/bbs/list">
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
                ${uname} 반갑습니다.&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="fas fa-cloud-sun"></i> 20&deg;C
        </div>
    </nav>
    <div class="container">
        <div>
            <h3 style="text-align: center; margin-top: 80px;">게시글 작성</h3>
        </div>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <form action="/bbs/update/${result.bid}/uid/${result.uid}" method="post">
                    <div class="form-group"> 
                        <label for="title">제목</label>
                        <input type="text" class="form-control" id="title" name="title" value="${result.title}">
                    </div>
                    <div class="form-group">
                        <label for="content">내용</label>
                        <textarea class="form-control" rows="15" id="content" name="content" value="${result.content}">${result.content}</textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="position: fixed; right: 270px; bottom: 180px;" value="변경">작성</button>
                </form>
            </div>
            <div class="col-2"></div>
        </div>
    </div>


    ${template.footer()}
    `;
}

