//static 은 express 에서 제공하는 미들웨어이다. 별도로 설치하지 않아도 된다..
const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();
app.set("port", process.env.PORT || 3000);

//미들웨어는 등록 순서가 중요하다..
//morgan 이 가장 먼저..
//static 이 그 다음.. 유저 요청이 static 리소스라면 아래에 등록된 미들웨어들이 실행
//될 필요가 없어서, static 미들웨어에 의해 파일만 넘겨주면 되서..
//static 미들웨어는 next() 호출하지 않는다.  이 곳에 걸리면 이곳에서 응답하고 끝난다.

//마지막 부분에 에러처리, 404, 500 미들웨어를 등록.

app.use(morgan("dev"));
//아래처럼 등록한 것은.. 서버의 경로만명시, 클라이언트 url 경로는 명시하지 않았다.
//client url 경로와 서버 경로가 동일한 경우..
// app.use(express.static(path.join(__dirname, 'public')))

//url 경로와 서버 경로를 바꾸고 싶을때..
app.use("/static", express.static(path.join(__dirname, "public")));
//http://localhost:3000/index.html ==> 404
//http://localhost:3000/static/index.html

app.get("/", (req, res) => {
  res.send("router 응답");
});
app.get("/dynamic", (req, res) => {
  res.send("dynamic 응답");
}); //라우터 응답과 다이나믹 응답
// 라우터 응답: 특정 URL 경로에 대한 요청이 발생하면 해당 경로를 처리하는 라우터가 실행되고, 그 라우터가 클라이언트에게 보내는 응답을 라우터 응답이라고 합니다.
// 다이나믹 응답: 서버가 클라이언트에게 보내는 응답이 동적으로 생성되거나 변경되는 것을 나타냅니다.

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
