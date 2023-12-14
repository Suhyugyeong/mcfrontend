const { ChildProcess } = require("child_process");
const crypto = require("crypto"); //단방향(해시), 양방향 모두 제공..

//해시..
console.log(
  "base64",
  crypto.createHash("sha512").update("1234").digest("base64")
);
console.log("hex", crypto.createHash("sha512").update("1234").digest("hex"));
console.log(
  "base64",
  crypto.createHash("sha512").update("1234").digest("base64")
);

//암호화
const algorithm = "aes-256-cbc";
//알고리즘에 따라 키의 길이
//256/8=32
//192/8=24
const key = "12345678901234567890123456789012";
//iv - initializer vector 암호화를 더욱 강력하게 하기 위해서..
//키 이외에 예측 불가능한 서버에서만 알고 있는 문자열까지 동원..
const iv = "1234567890123456";

const cipher = crypto.createCipheriv(algorithm, key, iv);
//암호화
let result = cipher.update("안녕하세요", "utf8", "base64");
//완료 별도 명시
result += cipher.final("base64");

console.log("암호화된 데이터", result);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
//문자열 인코딩.. 암호화와 반대로..!! 중요!!
let result2 = decipher.update(result, "base64", "utf8");
result2 += decipher.final("utf8");
console.log("복호화된 데이터", result2);
