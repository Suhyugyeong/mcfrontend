const exp = require("constants");
const http = require("http");
const fs = require("fs").promises;
const path = require("path");

//매개변수로 전달되는 쿠키를 분석해서 json object 로 만들어 주는 개발자 함수..
const parseCookies = (cookie = "") =>
  cookie
    .split(";") //문자열 ; 구분자로 잘라내고.. 여러건 들어왔을 수 있어서.. 잘린 문자열
    //배열로 전달해준다..
    .map((v) => v.split("=")) //map, 배열 갯수만큼 map() 내의 함수를 호출..
    //각각의 문자열을 다시 = 로 잘라내고..
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

//데이터 한글 - 홍길동
//=%ED%99%8D%EA%B8%B8%EB%8F%99
//영문자, 일부 특수키를 제외하고는 웹에서 request data 는 모두 위의 스타일로 변형되서
//전달 ,
//유저에게 입력받는 데이터, 한글.. encoding 되어 전달.. 그걸 다시 decoding 한 것이다.
http
  .createServer(async (req, res) => {
    //요청 request 에서 cookie 추출..
    const cookies = parseCookies(req.headers.cookie);

    if (req.url.startsWith("/login")) {
      //유저가 입력한 name 데이터 추출..
      const url = new URL(req.url, "http://localhost:8080");
      //http://localhost:8080/login?name=kim
      const name = url.searchParams.get("name");
      //어떤 업무로직 돌리고..

      //cookie 설정, 유저가 입력한 name 을 그대로 cookie 에 담아서..
      const expire = new Date();
      expire.setMinutes(expire.getMinutes + 5); //5분
      res.writeHead(302, {
        //상태 코드 값이 3xx 이다.. 브라우저에게
        //지정한 url 로 redirect 하라는 명령이다..
        Location: "/",
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )};Expires=${expire.toGMTString()};HttpOnly;Path=/`,
      });
      res.end(); //응답했다. 응답 body 는 없다.. header 에 redirect 명령이 들어갔음으로.. body 데이터
      //가 의미가 없다..
    } else if (cookies.name) {
      //쿠키를 분석했더니.. name 데이터가 있다면..
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(`${cookies.name} 님 안녕하세요.. `);
    } else {
      const data = await fs.readFile(path.join(__dirname, "login.html"));
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    }
  })
  .listen(8080, () => {
    console.log("8080 포트로 서버가 구동되었습니다.");
  });
