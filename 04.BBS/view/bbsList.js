const template = require('./template');

module.exports.bbsListForm = function(uname, rows) {
    let tableRow = [];
    for (let row of rows) {
        tableRow += `        
                    <tr>
                        <td style="text-align: center;">${row.bid}</td>
                        <td><a href='/bbs/content/${row.bid}'>${row.title}</a></td>
                        <td style="text-align: center;">${row.uname}</td>
                        <td style="text-align: center;">${row.regDate}</td>
                        <td style="text-align: center;">${row.viewCount}</td>
                    </tr>`;
    }
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
            ${uname} 반갑습니다.&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="fas fa-cloud-sun"></i> 20&deg;C
        </div>
    </nav>
    <div style="margin-top: 80px;"></div>
        <div class="container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th style="width: 10%; text-align: center;">번호</th>
                        <th style="width: 30%; text-align: center;">제목</th>
                        <th style="width: 25%; text-align: center;">작성자</th>
                        <th style="width: 15%; text-align: center;">날짜</th>
                        <th style="width: 10%; text-align: center;">조회수</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRow}
                </tbody>
            </table>
        </div>
    </div>

        ${template.footer()}
    `;
}