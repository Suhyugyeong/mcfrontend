//dotenv test
//>npm i dotenv

const express = require("express");

const app = express();
app.set("port", process.env.PORT || 3000);

//아래처럼 선언하는 것만으로 .env 에 있는 내용이 process.env 에 등록된다.
//파일명은 기본이 .env
require("dotenv").config();
app.get("/env", (req, res) => {
  console.log("db_host", process.env.DB_HOST);
  console.log("db_user", process.env.DB_USER);
  console.log("db_pass", process.env.DB_PASS);
  res.send(".env 테스트 성공.. ");
});

//dotenv 를 이용하면서.. 키등을 등록하는 파일명을 바꾸어도 상관은 없다..
//config() 의 매개변수에 파일명 지정..
require("dotenv").config({ path: "env.key" });
app.get("/key", (req, res) => {
  console.log("key1", process.env.KEY_1);
  console.log("key2", process.env.KEY_2);
  res.send("env.key 테스트 성공");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
