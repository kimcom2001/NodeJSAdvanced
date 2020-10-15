const template = require('./template');

module.exports.mainForm = function () {
    return `

        ${template.header()}

    <div style="margin-top: 80px;"></div>
    <div class="container">
        <table class="table table-borderless">
            <thead>
                <tr>
                    <th style="width: 10%; text-align: center;">번호</th>
                    <th style="width: 45%; text-align: center;">제목</th>
                    <th style="width: 15%; text-align: center;">글쓴이</th>
                    <th style="width: 15%; text-align: center;">날짜</th>
                    <th style="width: 15%; text-align: center;">조회수</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="text-align: center;">1000</td>
                    <td>글을 작성시 여기부분에 제목</td>
                    <td style="text-align: center;">이름</td>
                    <td style="text-align: center;">regDate</td>
                    <td style="text-align: center;">조회</td>
                </tr>
                <tr>
                    <td style="text-align: center;">1000</td>
                    <td>글을 작성시 여기부분에 제목</td>
                    <td style="text-align: center;">이름</td>
                    <td style="text-align: center;">regDate</td>
                    <td style="text-align: center;">조회</td>
                </tr>
                <tr>
                    <td style="text-align: center;">1000</td>
                    <td>글을 작성시 여기부분에 제목</td>
                    <td style="text-align: center;">이름</td>
                    <td style="text-align: center;">regDate</td>
                    <td style="text-align: center;">조회</td>
                </tr>
                <tr>
                    <td style="text-align: center;">1000</td>
                    <td>글을 작성시 여기부분에 제목</td>
                    <td style="text-align: center;">이름</td>
                    <td style="text-align: center;">regDate</td>
                    <td style="text-align: center;">조회</td>
                </tr>
                <tr>
                    <td style="text-align: center;">1000</td>
                    <td>글을 작성시 여기부분에 제목</td>
                    <td style="text-align: center;">이름</td>
                    <td style="text-align: center;">regDate</td>
                    <td style="text-align: center;">조회</td>
                </tr>
                <tr>
                    <td style="text-align: center;">1000</td>
                    <td>글을 작성시 여기부분에 제목</td>
                    <td style="text-align: center;">이름</td>
                    <td style="text-align: center;">regDate</td>
                    <td style="text-align: center;">조회</td>
                </tr>
                <tr>
                    <td style="text-align: center;">1000</td>
                    <td>글을 작성시 여기부분에 제목</td>
                    <td style="text-align: center;">이름</td>
                    <td style="text-align: center;">regDate</td>
                    <td style="text-align: center;">조회</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="container">
        <ul class="pagination justify-content-center">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center fixed-bottom">
        <span class="navbar-text">
            Copyright &copy; 2020 Hoseo Institute of Big Data
        </span>
    </nav>
</body>
</html>
    `;
}