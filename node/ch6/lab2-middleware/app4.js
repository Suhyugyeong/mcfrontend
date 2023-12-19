const express = require("express");

const app = express();
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("/.. hello express");
});

//서버 오류 상황..
app.get("/test/:no", (req, res) => {
  let no = req.params.no; //url 에 경로로 추가된 데이터를 파라미터라고..
  if (no > 10) {
    res.send(`정상적인 상황, 당신이 입력한 숫자는 ${no} 입니다.`);
  } else {
    //특정 상황을 에러 상황으로 만들기, throw new Error(에러메시지)
    throw new Error("서버오류.. 에러코드 111, 관리자에게 연락");
  }
});

app.get("/test2/:no", (req, res, next) => {
  let no = req.params.no; //url 에 경로로 추가된 데이터를 파라미터라고..
  if (no > 10) {
    res.send(`정상적인 상황, 당신이 입력한 숫자는 ${no} 입니다.`);
  } else {
    //next() 함수를 호출하면서 매개변수를 지정하면 에러메시지..
    next("서버 오류.. 에러코드 2222, 관리자에게 연락");
  }
});

//요청이 잘못되었을때 실행되는 미들웨어는 가장 마지막 부분에 등록하는 것이 일반적이다.
//아래의 미들웨어는 서버 에러상황은 아니지만.. 요청에 의해 위에 실행될 라우터가 없는경우
//404 상황에 실행되는 미들웨어..
app.use((req, res, next) => {
  //res.send() 를 하면 status code 는 200번이 지정된다..
  //요청 잘못이어서 404 상황이기는 하지만.. 유저에게는 200 으로 보내고.. 메시지로
  //요청 잘못되었다고 알릴 수도 있다.. 해킹을 방지하기 위해서 그렇게 하기도 한다..
  res.status(404).send("요청하신 파일이 없습니다. url 을 확인해 주세요");
});

//에러 처리 전문 미들웨어..
//일반적으로 가장 아랫부분에 작성..
//매개변수 4개 선언해야..
app.use((err, req, res, next) => {
  console.error(err);
  //보통 서버 오류도, 해킹을 방지하기 위해서, 기본은 500으로 넘겨야 하지만..
  //정상상황인것 처럼 200으로 넘기기도 한다..
  res.send("에러가 발생했습니다.");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
