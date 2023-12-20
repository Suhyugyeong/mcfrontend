const express = require("express");

const app = express();
app.set("port", process.env.PORT || 3000);

//여러 미들웨어를 등록할때 한꺼번에 등록도 가능하다..
app.use(
  //app.use는 미들웨어를 추가하는데 사용
  (req, res, next) => {
    console.log("middleware 1");
    next();
  },
  (req, res, next) => {
    console.log("middleware 2");
    next();
  },
  (req, res, next) => {
    console.log("middleware 3");
    next();
  }
);

app.get("/", (req, res) => {
  //app.get은 HTTP GET 요청에 대한 라우터를 설정하는데 사용
  res.send("hello world");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
