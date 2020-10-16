const template = require('./template');

module.exports.listForm = function(rows) {
    let tableRow = [];
    for (let row of rows) {
        tableRow += `<tr>
                        <td style="text-align: center;">${row.uid}</td>
                        <td>${row.title}</td>
                        <td style="text-align: center;">${row.uname}</td>
                        <td style="text-align: center;">${row.regDate}</td>
                        <td style="text-align: center;">${row.viewCount}</td>
                    </tr>`;
    }
    return `

    ${template.header()}


        <div style="margin-top: 80px;"></div>
        <div class="container">
            <form action="/user/list" method="post">
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