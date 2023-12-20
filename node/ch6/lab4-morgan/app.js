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
  //로그를 저장할 파일의 경로를 지정합니다. 이 코드에서는 현재 스크립트 파일의 디렉토리(__dirname)에서 상위 디렉토리로 이동한 후 log/access.log 경로에 파일을 생성하거나 엽니다.
  flags: "a",
  //flags: "a"는 Node.js의 fs.createWriteStream 메서드에서 사용되는 옵션 중 하나로, 파일을 열 때 어떤 작업을 수행할지를 지정합니다. 여기서 "a"는 "append"를 나타내며, 기존 파일에 이어서 쓰기를 수행하는 옵션입니다.
  //노트 참고
});
//우리가 만든 file stream 을 morgan 에 연결..
app.use(morgan("dev", { stream: accessLogStream }));
//morgan("dev"): morgan 미들웨어를 설정합니다. 여기서 "dev"는 개발 환경에 적합한 로그 형식을 사용하도록 지정한 것입니다. 다양한 로그 형식 중에서 "dev"는 간결하게 요청 메소드, URL, 상태 코드, 응답 시간 등을 포함한 형태입니다.
//{ stream: accessLogStream }: morgan이 생성하는 로그를 기록할 스트림을 지정합니다. 앞서 생성한 accessLogStream을 사용하여 로그를 access.log 파일에 기록합니다.
app.get("/", (req, res) => {
  res.send("morgan test.....");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
