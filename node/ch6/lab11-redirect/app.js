const express = require("express");
const morgan = require("morgan");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));

//forward
//클라이언트 요청을 다른 url 요청으로 돌린다..
//back-end 에서 다른 url 의 middleware 가 실행되게..
//req, res - 1번
//클라이언트 브라우저의 url 은 바뀌지 않는다. ~~~/one 으로 찍힌다..
//forward 방식으로 여러 미들웨어를 실행시킬 수 있지만.. send() 는 한번만..
app.get("/one", (req, res, next) => {
  //업무처리 하고, 다른 url 의 미들웨어가 실행되게 한다..
  //클라이언트 요청 url 을 변경시키고 next()
  req.url = "/two";
  //데이터 전달도 가능.
  res.locals.data1 = "hello";
  next();
});
app.get("/two", (req, res, next) => {
  let data = res.locals.data1;
  res.send(`i am two middleware, ${data}`);
});

//redirect
//클라이언트 요청을 다른 url 요청으로 돌린다..
//응답해서 브라우저가 자동으로 다른 url 로 요청하는 것이고..
//req, res - 2번
//브라우저가 다시 요청하는 것임으로.. 브라우저의 url 은 변경된다..
//응답이 2번 발생하는 것임으로 각각에서 send() 해도 상관없다..
app.get("/three", (req, res, next) => {
  //업무처리 하고..
  //브라우저에게 명령을 내리는 것이다. 이 url 로 다시 요청하라고..
  res.redirect("/four");
});
app.get("/four", (req, res) => {
  res.send("i am four middleware");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
