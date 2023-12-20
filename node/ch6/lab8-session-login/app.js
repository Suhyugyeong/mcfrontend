//npm i express-session
//테스트할 때 npx nodemon app.js 하면 되고,
//여기서는 아이디 비번이 같은 경우에만 로그인이 가능함
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.set("port", process.env.PORT || 3000);

//미들웨어 등록
app.use(morgan("dev")); //개발환경에서 http 요청을 콘솔에 로깅하는데 사용하는 미들웨어
app.use(cookieParser("secret@1234")); //쿠키를 파싱하는 데 사용, "secret@1234"는 쿠키를 서명하기 위한 키
app.use(
  session({
    //세션은 클라이언트와 서버간의 상태를 유지하는데 사용
    secret: "secret@1234",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true, //front js 에서는 이 쿠키 데이터 접근하지 못하게..
    },
  })
);
app.use(express.json()); //JSON형식 요청 본문을 파싱
app.use(express.urlencoded({ extended: true })); //URL-encoded 형식의 요청 본문을 파싱하는 데 사용되는 미들웨어
//여기에서 옵션 { extended: true }는 Node.js의 querystring 모듈을 사용하여 URL-encoded 데이터를 해석하는데 필요한 옵션
//이 옵션이 true로 설정되면, 중첩된 객체를 파싱할 수 있도록 허용됩니다.
//예를 들어, key1=value1&key2=value2와 같은 데이터를 해석할 때
//extended: true로 설정하면 { key1: 'value1', key2: 'value2' }와 같은 형태로 파싱됩니다.

app.get("/", (req, res) => {
  if (req.session.loginId) {
    //로그인한 유저..
    const output = `
      <h2>로그인한 사용자</h2>
      <p>${req.session.loginId}님 환영합니다.</p>
    `;
    res.send(output);
  } else {
    //로그인 하지 않은 유저..
    const output = `
      <h2>로그인하지 않았습니다.</h2>
      <form action="login" method="post">
        ID <input type="text" name="id"/><br/>
        PW <input type="text" name="pw"/><br/>
        <input type="submit" value="login"/>
      </form>
    `;
    res.send(output);
  }
});

app.post("/login", (req, res) => {
  //로그인 업무 처리..
  if (req.body.id && req.body.pw && req.body.id === req.body.pw) {
    //로그인 성공으로 가정..
    //이후 이 유저 접속시에.. 로그인 상태 유지..
    req.session.loginId = req.body.id;
    res.send(`
      <h3>${req.body.id}로 로그인 성공하였습니다.</h3>
      <a href="logout">logout</a><br/>
      <a href="/">main 페이지 가기</a>
    `);
  } else {
    //로그인 실패 상황..
    res.send(`
      <h3>로그인 실패하였습니다.</h3>
      <a href="/">main 페이지 가기</a>
    `);
  }
});

app.get("/logout", (req, res) => {
  //로그인 상태 유지를 위해 id 값을 유지하고 있음으로, 로그아웃 처리는 세션 삭제
  res.clearCookie("connect.sid"); //세션 설정시 name 을 지정하지 않았다면.. 기본 name
  //이 connect.sid
  res.send(`
    <h3>logout</h3>
    <a href="/">main 페이지 가기</a>
  `);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
