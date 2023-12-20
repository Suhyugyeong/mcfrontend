//http://localhost:8080/one, two, three, four 이런식으로 검사
const express = require("express");
const morgan = require("morgan");

const app = express();
app.set("port", process.env.PORT || 8080);

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
  // 이 부분은 현재 요청의 URL을 변경합니다. req.url 속성은 현재 요청의 경로를 나타내는데, 여기서는 "/two"로 변경되었습니다. 이는 현재 미들웨어의 실행 후에 브라우저가 다시 "/two"로 리다이렉트되는 효과가 있을 수 있습니다.
  //데이터 전달도 가능.
  res.locals.data1 = "hello";
  next();
});
app.get("/two", (req, res, next) => {
  let data = res.locals.data1;
  // 이 부분은 이전 미들웨어에서 설정한 로컬 변수 data1을 가져와서 data 변수에 할당합니다. 이로써 "/one"에서 설정한 데이터를 "/two"에서 사용할 수 있게 됩니다.
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

///one 및 /two의 경우 두 경로 모두 서버 내에서 미들웨어를 통과하며, 중간에 데이터를 변경하거나 전달할 수 있습니다.
//three 및 /four의 경우 /three에서 /four로 리다이렉션되면 새로운 요청이 만들어지며, 서버는 /four 경로에서의 미들웨어만을 통과합니다. 이는 새로운 요청이 발생하므로 이전 요청에서 설정한 데이터 등은 유지되지 않습니다.

//클라이언트가 "/one" 경로로 GET 요청을 보내면, 서버는 미들웨어 체인을 통과하면서 URL을 "/two"로 변경하고 로컬 변수를 설정한 후 다음 미들웨어로 제어를 전달합니다.
//클라이언트가 "/two" 경로로의 GET 요청을 보내면, 서버는 이전 미들웨어에서 설정한 로컬 변수를 활용하여 "i am two middleware, hello"라는 텍스트 응답을 보냅니다.

//클라이언트가 "/three" 경로로 GET 요청을 보내면, 서버는 "/four"로 리다이렉션하게 됩니다.
//클라이언트는 새로운 요청으로 "/four" 경로로 이동하면, 서버는 "/four" 경로에서의 미들웨어만을 통과하며 "i am four middleware"라는 텍스트 응답을 보냅니다.

//단계적 처리와 데이터 전달이 필요한 경우: 첫 번째 방식을 사용합니다.
//새로운 요청이 필요하고 리다이렉션을 사용하고 싶은 경우: 두 번째 방식을 사용합니다.
