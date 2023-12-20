const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
//path.join(__dirname, "public"): 정적 파일들이 위치한 디렉토리의 경로를 나타냅니다. __dirname은 현재 스크립트가 위치한 디렉토리의 경로를 나타냅니다. "public"은 정적 파일들이 위치한 서브 디렉토리의 이름입니다
//test1.... param 데이터..
app.get("/:name/:addr/:age", (req, res) => {
  //:name은 라우트 매개변수 또는 라우터 파라미터
  res.send(
    `param test1 : ${req.params.name}, ${req.params.addr}, ${req.params.age}`
  );
});
app.get("/name/:name/data/:data", (req, res) => {
  res.send(`param test2 : ${req.params.name}, ${req.params.data}`);
}); //params는 라우트 매개변수에 대한 값을 포함
//http://localhost:3000/index.html

//test2...... query(search) 문자열 획득..
//query 문자열은 body 데이터는 아니고 header 데이터..
//Express 애플리케이션에서 GET 요청에 대한 특정 경로(/query1)에 대한 핸들러를 정의
app.get("/query1", (req, res) => {
  res.send(`
  query1 test: name=${req.query.name}, addr=${req.query.addr}, age=${req.query.age}`);
});

app.get("/query2", (req, res) => {
  let ide = req.query.ide; //클라이언트가 전달한 쿼리 매개변수 중에서 ide를 가져옴
  console.dir(ide);
  //ide 로 데이터가 안넘어 올수도 있고(유저가 선택 안했다면)
  //ide 로 데이터가 하나만 넘어올수도 있고.. (유저가 하나만 선택하면..)
  //ide 로 데이터가 여러개 넘어올수도 있고.. (유저가 여러개 선택하면.. ) ==>배열로..
  let ideResult = "";
  if (ide && Array.isArray(ide)) {
    ide.forEach((element) => {
      ideResult += element + ",";
    }); //ide가 배열로 전달된 경우
  } else {
    ideResult = ide; //ide가 하나일 경우
  }

  let car2 = req.query.cars2;
  let car2Result = "";
  if (car2 && Array.isArray(car2)) {
    car2.forEach((element) => {
      car2Result += element + ",";
    });
  } else {
    car2Result = car2;
  }

  res.send(`
    입력하신 데이터는, 
    name=${req.query.name},
    apple=${req.query.apple},
    peach=${req.query.peach},
    ide=${ideResult},
    language=${req.query.language},
    car1=${req.query.cars1},
    car2=${car2Result}
  `);
});

//test3........ form body..,.
//예전에는 body-parser를 별도로 설치했어야 하는데..
//express 에서 자체적으로 지원함으로 설치하지 않아도 ...
//extended 옵션, express 의 바디 파서가 내부적으로 이용하는 모듈이 여러개 준비되어 있는데
//QS 라는 모듈을 이용해서 바디를 파싱해라...
//거의 대부분 QS 모듈을 이용
app.use(express.urlencoded({ extended: true })); //이 옵션을 사용하면 qs 라이브러리를 사용하여 URL-encoded 데이터를 해석합니다
//extended: false: 이 옵션을 사용하면 Node.js의 기본 내장 모듈인 querystring을 사용하여 URL-encoded 데이터를 해석
app.post("/form", (req, res) => {
  let ide = req.body.ide;
  console.dir(ide);
  let ideResult = "";
  if (ide && Array.isArray(ide)) {
    ide.forEach((element) => {
      ideResult += element + ",";
    });
  } else {
    ideResult = ide;
  }

  let car2 = req.body.cars2;
  let car2Result = "";
  if (car2 && Array.isArray(car2)) {
    car2.forEach((element) => {
      car2Result += element + ",";
    });
  } else {
    car2Result = car2;
  }

  res.send(`
    입력하신 데이터는, 
    name=${req.body.name},
    apple=${req.body.apple},
    peach=${req.body.peach},
    ide=${ideResult},
    language=${req.body.language},
    car1=${req.body.cars1},
    car2=${car2Result}
  `);
});

//test4... ajax json data....
//json 미들웨어, express 자체에서 제공..
//js 에서 json 은 객체, 그런데 네트워크 전송시에는 문자열..
//json 객체 <-> 문자열
//JSON.parse(문자열)
//JSON.stringify()
//express 의 json 미들웨어가 자체적으로 네트웍상에서 넘어오는 json 문자열을 알아서 json 객체로 변형
app.use(express.json());
app.post("/json1", (req, res) => {
  res.send(`json data : name=${req.body.name}, score=${req.body.score}`);
});

//test5... ajax, 일반문자열..
var bodyParser = require("body-parser");
//body-parser는 Express 애플리케이션에서 POST 요청의 본문(body)을 쉽게 파싱하기 위한 Node.js 미들웨어입니다
app.use(bodyParser.text()); //일반 문자열이다..
app.post("/string1", (req, res) => {
  res.send(`string data : ${req.body}`);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
