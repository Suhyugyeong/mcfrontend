const express = require("express");

const app = express();
app.set("port", process.env.PORT || 3000);

//여러 미들웨어를 등록할때 한꺼번에 등록도 가능하다..
app.use(
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
  res.send("hello world");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
