// 수업시 사용할 기본 설정 sha256 // base64
// 모듈 추출
const crypto = require('crypto');

// 해시 생성

let shasum = crypto.createHash('sha256'); // sha256, sha512 
shasum.update('1234');
let output = shasum.digest('base64'); // hex, base64 / base64는 hex의 인코딩 방식이라고 한다.
// let output = shasum.digest('base64', shasum.update('숫자')) => 이런 형식으로 사용 가능

// 출력
console.log('password:', output);
console.log(output.length)