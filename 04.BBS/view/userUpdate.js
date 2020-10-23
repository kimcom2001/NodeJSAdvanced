const template = require('./template');

module.exports.updateForm = function (result) {
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
    </head>
    <body>
    <div class="container" style="margin-top: 90px;">
        <h3 style="text-align: center; margin-top: 25px;">정보 수정</h3>
        <hr>
    <div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form action="/user/update/uid/${result.uid}" method="post">
                    <table class="table table-borderless">
                        <tr>
                            <td><label for="pwd">Password</label></td>
                            <td><input type="password" name="pwd" id="pwd"></td>
                        </tr>
                        <tr>
                            <td><label for="pwd2">Password 확인</label></td>
                            <td><input type="password" name="pwd2" id="pwd2"></td>
                        </tr>
                        <tr>
                            <td><label for="uname">이름</label></td>
                            <td><input type="text" name="uname" id="uname" value="${result.uname}"></td>
                        </tr>
                        <tr>
                            <td><label for="tel">전화번호</label></td>
                            <td><input type="text" name="tel" id="tel" value="${result.tel}"></td>
                        </tr>
                        <tr>
                            <td><label for="email">이메일</label></td>
                            <td><input type="text" name="email" id="email" value="${result.email}"></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <input class="btn btn-primary" type="submit" value="변경">
                                <input class="btn btn-secondary" type="submit" value="취소">
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
    </div>


        ${template.footer()}
    `;
}