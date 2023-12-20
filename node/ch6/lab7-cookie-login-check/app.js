//npm i cookie-parser
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //client form 데이터 획득..

//로그인 페이지 라우트 및 로직
//Express에서 라우팅은 app.get(), app.post(), app.put()과 같은 메소드를 사용하여 정의됩니다.
//주어진 코드에서도 /login 경로에 대한 GET 및 POST 라우트가 정의되어 있습니다.
//따라서 코드에서 라우팅이 사용되고 있습니다.
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "loginForm.html"));
}); //GET요청에 대한 라우트로, 로그인 폼을 제공
app.post("/login", (req, res) => {
  if (req.body.id_check && req.body.id_check == "on") {
    //HTML 폼(form)에서 전송된 체크박스의 상태를 확인하는 용도로 사용
    //id_check의 값이 문자열 "on"과 동일한지 확인하는 비교입니다. 체크박스는 체크되면 on으로 전송되기 때문에, 체크박스가 체크되어 있는지 여부를 확인합니다.
    res.cookie("loginId", req.body.id, {
      maxAge: 60 * 1000,
    });
  } else {
    //체크가 안된 상태.. 쿠키 데이터가 설정되어 있다면 삭제시켜서.. id 출력안되게
    res.clearCookie("loginId", {});
  }
  res.sendFile(path.join(__dirname, "loginOk.html"));
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
