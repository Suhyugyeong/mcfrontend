const express = require("express");

const app = express();
app.set("port", process.env.PORT || 3000);

//미들웨어 실행 순서 테스트..
app.use((req, res, next) => {
  console.log("middleware1, before next");
  next();
  console.log("middleware1, after next");
});

app.use((req, res, next) => {
  console.log("middleware2, before next");
  next();
  console.log("middleware2, after next");
});

app.get("/", (req, res) => {
  res.send("get... /");
});

app.get("/about", (req, res) => {
  res.send("get... /about");
});

app.use((req, res, next) => {
  console.log("middleware3, before next");
  next();
  console.log("middleware3, after next");
});

//http://localhost:3000/
// middleware1, before next
// middleware2, before next
// middleware2, after next
// middleware1, after next

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
