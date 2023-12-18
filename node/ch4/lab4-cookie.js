const http = require("http");
//node에서 제공하는 http 모듈 이용

http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie); //요청한..
    //응답하면서 response header에 쿠키 데이터 설정이 되어야 함..
    //name=value 형식으로 몇 개라도 전송 가능한
    //중요한건 헤더값임
    //네트워크 통신에서 header, body 순서를 바꿀 수는 없다. 항상 헤더가 먼저 전송되고 그 후 바디 전송
    //그러므로, 아래의 두줄 순서를 바꿀 순 없다!
    res.writeHead(200, { "Set-Cookie": "mycookie=testyo" });
    res.end("hello cookie");
  })
  .listen(8080, () => {
    console.log("8080 포트로 서버가 구동되었습니다.");
  }); //몇 번 포트로, 두번째 인자는 필수는 아니고..

//동작원리를 이해합시다! 개발자도구 열어서 network랑 application 보면서
