const express = require("express");

const app = express();
app.set("port", process.env.PORT || 3000);

//미들웨어 등록, 실행 순서 테스트..
//여러개 등록 가능.. 요청이 들어왔을때 등록된 순서대로 실행된다.

//미들웨어 등록 함수는 use() 이지만, get, post 등의 http request method 에 의해
//실행될 미들웨어를 조금더 편하게 등록하라고.. get(), post() 등의 함수 제공..

//아래의 미들웨어는 경로 조건이 추가되었다.. 첫번째 매개변수..
//미들웨어는 등록 순서로 실행되지만.. 경로 조건이 추가되면.. 실행이 안될 수도 있다.

//아래의 두 미들웨어는 경로 조건은 동일하지만.. get, post 로 구분되어 있음으로..
//둘중 하나가 실행..

//아래처럼 get, post 등의 함수로 등록하는 미들웨어를 흔히들 라우터라고 많이 부른다..
app.post("/", (req, res) => {
  res.send("post... hello express");
});

app.get("/", (req, res) => {
  res.send("get... hello express");
});

//>npx nodemon app1.js
//웹의 기본 method 는 get 방식, post, put, delete 등은 별도로 명시해야..
//get... hello express

//url 경로에 :xxx 로 등록시키는 것은 url 에 임의 단어(dynamic url)
app.get("/category/:name", (req, res) => {
  //위에 url 경로에 :aaa 이면 req.params.aaa
  res.send(`category/:name... ${req.params.name}`);
});
//http://localhost:3000/category/kim ==> category/:name... kim
//http://localhost:3000/category/lee ==> category/:name... lee

app.get("/category/park", (req, res) => {
  //위에 url 경로에 :aaa 이면 req.params.aaa
  res.send(`category/park... `);
});
//http://localhost:3000/category/park ==> 위의 미들웨어 실행 안된다..
//동일 조건에 만족하는 미들웨어가 여러개라면 위에부터 실행된다..

//get(), post() 등으로 미들웨어를 등록하면서 next() 를 할 수도 있기는 하지만..
//일반적으로 유저 요청의 최종 처리 개념의 코드가 등로되어 next() 호출을 잘 안한다..

//동일 조건으로 여러개의 미들웨어가 실행이 된다면 범위가 좁은 미들웨어를
//위에 선언하는 것이 좋다..
app.get("/user/park", (req, res, next) => {
  //위에 url 경로에 :aaa 이면 req.params.aaa
  res.send(`user/park... `);
  //아래의 경우 next() 를 하면
  //Cannot set headers after they are sent to the client 에러 발생..
  // next()
});
app.get("/user/:name", (req, res) => {
  //위에 url 경로에 :aaa 이면 req.params.aaa
  res.send(`user/:name...${req.params.name} `);
});
app.get("*", (req, res) => {
  //위에 url 경로에 :aaa 이면 req.params.aaa
  res.send(`*... `);
});

//미들웨어에서 다음 미들웨어를 실행시키기 위해서 사용하는 함수, next()
//app.use(), app.get() 등에서 next() 를 이용할 수도 있지만..

//보통의 경우 app.use() 로 등록하는 미들웨어는 여러 요청시 공통으로 실행될 로직이어서
//공통 부분 실행되고 다음 미들웨어가 실행되게 next() 를 활용한다..

//app.get(), app.post() 들은 보통 라우터여서 유저 요청시 유저 화면이 조정되는 결과를
//전송하는 역할이어서.. 응답을 하기 위해서..
//next() 에 의해 여러 미들웨어가 실행될수 있기는 하지만.. res.send() 는 여러번 실행
//시킬 수 없다..

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
