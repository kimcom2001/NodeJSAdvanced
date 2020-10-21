const template = require('./template');

module.exports.registForm = function () {
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
        <h3 style="text-align: center; margin-top: 25px;">회원 가입</h3>
        <hr>
    <div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form action="/user/register" method="post">
                    <table class="table table-borderless">
                        <tr>
                            <td><label for="uid">사용자 ID</label></td>
                            <td><input type="text" name="uid" id="uid"></td>
                        </tr>
                        <tr>
                            <td><label for="pwd">비밀번호</label></td>
                            <td><input type="password" name="pwd" id="pwd"></td>
                        </tr>
                        <tr>
                            <td><label for="pwd2">비밀번호 확인</label></td>
                            <td><input type="password" name="pwd2" id="pwd2"></td>
                        </tr>
                        <tr>
                            <td><label for="uname">이름</label></td>
                            <td><input type="text" name="uname" id="uname"></td>
                        </tr>
                        <tr>
                            <td><label for="tel">전화번호</label></td>
                            <td><input type="text" name="tel" id="tel"></td>
                        </tr>
                        <tr>
                            <td><label for="email">이메일</label></td>
                            <td><input type="text" name="email" id="email"></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <input class="btn btn-primary" type="submit" value="제출">
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