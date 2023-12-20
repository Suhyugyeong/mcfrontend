//dotenv test
//>npm i dotenv

const express = require("express");

const app = express();
app.set("port", process.env.PORT || 3000);

//아래처럼 선언하는 것만으로 .env 에 있는 내용이 process.env 에 등록된다.
//파일명은 기본이 .env
require("dotenv").config();
//config() 함수는 dotenv 모듈에서 제공하는 함수 중 하나로, .env 파일에서 읽어온 환경 변수를 process.env 객체에 추가하는 역할을 합니다.
app.get("/env", (req, res) => {
  //"/env" 경로로 GET 요청을 보내면 이 핸들러가 실행됩니다.
  console.log("db_host", process.env.DB_HOST);
  console.log("db_user", process.env.DB_USER);
  console.log("db_pass", process.env.DB_PASS);
  res.send(".env 테스트 성공.. ");
});

//dotenv 를 이용하면서.. 키등을 등록하는 파일명을 바꾸어도 상관은 없다..
//config() 의 매개변수에 파일명 지정..
require("dotenv").config({ path: "env.key" });
//.env 파일 대신에 env.key 파일을 사용하여 환경 변수를 설정하는 예제입니다. 또한, 특정 경로에 위치한 env.key 파일을 사용하도록 dotenv.config() 함수에 path 옵션을 제공하고 있습니다.
app.get("/key", (req, res) => {
  //클라이언트가 "/key" 경로로 GET 요청을 보내면 이 핸들러가 실행됩니다.
  console.log("key1", process.env.KEY_1);
  console.log("key2", process.env.KEY_2);
  res.send("env.key 테스트 성공");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
