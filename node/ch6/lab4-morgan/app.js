//>npm i morgan
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const app = express();
app.set("port", process.env.PORT || 3000);

//morgan 은 클라이언트 요청, 응답과 관련된 정보를 로깅해 주는 역할이다..
//등록하면 거의 맨 앞에 등록을 한다..
// app.use(morgan('dev'))
//GET / 304 3.503 ms - -

// app.use(morgan('combined'))
//::1 - - [19/Dec/2023:05:49:38 +0000] "GET / HTTP/1.1" 304 - "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

//운용 로그는 일반적으로 영속적 저장한다..
//db, file
//ch6/log 폴더 만들고..
//일반적으로 운용로그 파일은 일별로 분리..
const accessLogStream = fs.createWriteStream(`${__dirname}/../log/access.log`, {
  flags: "a",
});
//우리가 만든 file stream 을 morgan 에 연결..
app.use(morgan("dev", { stream: accessLogStream }));

app.get("/", (req, res) => {
  res.send("morgan test.....");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
