module.exports.updateForm = function(result) {
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>정보 수정</title>
    </head>
    <body>
        <h3>정보 수정</h3>
        <hr>
        <form action="/update" method="post">
            <input type="hidden" name="sid" value="${result.sid}">
            <table>
                <tr>
                    <td><label for="name">정보 수정</label></td>
                    <td><input type="text" name="name" id="name" value="${result.name}"></td>
                </tr>
                <tr>
                    <td><label for="debut">데뷔</label></td>
                    <td><input type="text" name="debut" id="debut" value="${result.debut}"></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" value="제출"></td>
                </tr>
            </table>
        </form>
    </body>
    </html>
    `;
}