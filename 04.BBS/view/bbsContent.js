

module.exports.contentForm = function(uname, bid, result) {

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
                <a class="nav-link" href="/logout">로그아웃</a>
            </li>
        </ul>
        <div class="navbar-text fixed-right" id="weather">
            ${uname}님 반갑습니다.&nbsp;&nbsp;&nbsp;&nbsp;
        <i class="fas fa-cloud-sun"></i> 20&deg;C
        </div>
    </nav>
    <form action="/user/content" method="get">
        <div class="container">
            <div class="row">
                <div class="col-1"></div>
                <div class="col-7">
                    <h3>${result.title}</h3>
                    <p><span>글번호: ${result.bid}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>날짜: ${result.regDate}</span></p>
                </div>
                <div class="col-3">
                    <h3>${result.uname}</h3>
                    <p><span>조회 10</span>&nbsp;&nbsp;<span>리플 10</span></p>
                </div>
                <div class="col-1"></div>
            </div>
            <hr>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-8">
                    <p>${result.content}</p>
                </div>
                <div class="col-2">
                    <a href="/bbs/update/${result.bid}">수정</a>
                    <a href="/bbs/delete/${result.bid}">삭제</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
`;
}