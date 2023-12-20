//npm i pug
const express = require("express");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// Express 애플리케이션에서 사용할 템플릿 엔진을 설정하는 부분입니다.

app.get("/test", (req, res) => {
  //결과를 클라이언트에 응답하는데, 템플릿 파일을 이용하겠다면.. render
  //test 는 템플릿 파일 명.. 서브 경로가 있다면 경로 명시..
  //확장자는 자동으로 pug
  //템플릿 파일명만 명시해도 되지만.. 데이터를 같이 전달해서.. 두번째 매개변수로..
  res.render("test", {
    name: "kim",
    count: 10,
    isCheck: true,
    datas: [10, 20, 30],
    obj: {
      data1: "hello",
      data2: "world",
    },
  });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
