const http = require("http");

//서버 생성..
const server = http.createServer((req, res) => {
  //response header 설정..
  //모든 response header 를 개발자에 의해 설정된다는 것이 아니라..
  //필요한 것만..
  //header 를 해석하는 곳은 이 response 를 받는 브라우저..
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  //body..
  res.write("<h2>Server Test</h2>");
  res.write("<p>hello world</p>");
  res.end("<p>Hello Server</p>");
});
server.listen(8080);
//server 가 8080 로 들어오는 요청을 대기하기 시작하면..
server.on("listening", () => {
  console.log("서버가 구동되었습니다. 8080 포트로 들어오는 요청을 대기합니다.");
});
server.on("error", (err) => {
  console.error(err);
});

//http://localhost:8080/
//http://127.0.0.1:8080/

const server1 = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  //body..
  res.write("<h2>Server1 Test</h2>");
  res.write("<p>hello world</p>");
  res.end("<p>Hello Server</p>");
});
server1.listen(8081);
server1.on("listening", () => {
  console.log(
    "서버1가 구동되었습니다. 8080 포트로 들어오는 요청을 대기합니다."
  );
});

//http://localhost:8080/
//http://localhost:8081/

// 동일 컴퓨터 내에 동일 서버를 여러곳에서 사용하면.. 에러..
//address already in use :::8080
