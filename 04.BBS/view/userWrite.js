const template = require('./template');

module.exports.writeForm = function () {
    return `
        ${template.header}
    <div class="container">
        <div>
            <h3 style="text-align: center; margin-top: 80px;">게시글 작성</h3>
        </div>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
            <form action="/action_page.php">
                <div class="form-group">
                    <label for="bid">작성자</label>
                    <input type="text" class="form-control" id="bid" placeholder="작성자명" name="bid">
                    <br>
                    <label for="title">제목</label>
                    <input type="text" class="form-control" id="title" placeholder="제목을 입력하세요" name="title">
                </div>
            </div>
            <div class="col-2"></div>
            </form>
            <div class="col-2"></div>
            <div class="col-8">
                <form action="/action_page.php">
                    <div class="form-group">
                        <label for="content">내용</label>
                        <textarea class="form-control" rows="15" id="content" placeholder="내용을 입력하세요" name="content"></textarea>
                    </div>
                </form>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
    <form action="/user/write" method="POST">
        <button type="submit" class="btn btn-primary" style="position: fixed; right: 270px; bottom: 150px;">작성</button>
    </form>


    ${template.footer()}
    `;
}
  