//node에서 제공하는 모듈, node_module에 있는 모듈은 경로 명시할 필요 없이, 모듈명 그대로
const express = require("express");
const path = require("path");

//서버 준비 변수 app이 서버입니당
const app = express();
//app.set(), app 객체에 개발자 임의의 데이터를 담을 수 있다. 그때 함수가 set()
app.set("port", process.env.PORT || 3000);

//get방식으로 들어오는 요청 처리
//'/'이게 url임
app.get("/", (req, res) => {
  //   res.send("hello world3, express");
  //express를 이용하면 fs 모듈을 직접 사용하지 않아도 된다. 내부적으로 이용해준다.
  res.sendFile(path.join(__dirname, "/index.html"));
});

//app에 담긴 데이터 획득, get()
app.listen(app.get("port"), () => {
  console.log("서버 실행중");
});

//test1.....
//>node app1.js
//포트 번호는 300이니까 localhose:3000으로 열면 돼요
//코드 수정, 저장..
//브라우저 새로고침해도 변경사항은 등록이 안 될거임
//서버 종료 후 다시 서버 실행을 해봅시다 control+c
//node 명령으로 서버 실행은 잘 되지만, 변경사항이 동적 적용되지 않기 때문에(hot deploy) 불편함

//test2......
//>nodemon app1.js
//'nodemon'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는 배치 파일이 아닙니다.
//nodemon이 설치되었다 하더라도 라이브러리 모듈이 아니라 툴이다(실행명령어란 소리)
//위처럼 실행시키면 에러가 나기 때문에 명령어를 npx로
//>npx nodemon app1.js
//코드 수정, 저장, 브라우저 새로고침 다 가능한..! => 변경사항 반영(hot deploy 지원/ 개발편의성 뛰어나)

//test3....
//package.json에 실행 명령어 등록
//<<npm start
