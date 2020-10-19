const template = require('./template');

module.exports.listForm = function(uname, rows) {
    let tableRow = [];
    for (let row of rows) {
        tableRow += `<tr>
                        <td style="text-align: center;">${row.NO}</td>
                        <td style="text-align: center;">${row.uid}</td>
                        <td style="text-align: center;">${row.uname}</td>
                        <td style="text-align: center;">${row.tel}</td>
                        <td style="text-align: center;">${row.email}</td>
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
                <a class="nav-link" href="/user/list"><i class="fas fa-home"></i>&nbsp;홈</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/user/write"><i class="fas fa-edit"></i>&nbsp;새글</a>
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
    <div style="margin-top: 80px;"></div>
    <div class="container">
        <form action="/user/list" method="post">
            <table class="table table-borderless">
                <thead>
                    <tr>
                        <th style="width: 10%; text-align: center;">번호</th>
                        <th style="width: 10%; text-align: center;">아이디</th>
                        <th style="width: 45%; text-align: center;">이름</th>
                        <th style="width: 15%; text-align: center;">전화번호</th>
                        <th style="width: 15%; text-align: center;">이메일</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRow}
                </tbody>
            </table>
        </form>
    </div>
    <div class="container">
        <ul class="pagination justify-content-center">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
    </div>

        ${template.footer()}
    `;
}

