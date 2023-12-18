//http://localhost:8080/
//에러남!! 강사님 코드랑 비교해 보기...!

//흐름을 이해해야함
//클라이언트 요청이 들어왔는데, 유저가 입력한 걸 그대로 쿠키로 설정했다..
const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const { decode } = require("punycode");
const { getSystemErrorMap } = require("util");

//개발자 함수 : 매개변수로 전달되는 쿠키를 분석해서 json object로 만들어주는 개발자 함수
const pareseCookies = (cookie = " ") =>
  cookie
    .split(";") //문자열 ; 구분자로 잘라내고, 여러건 들어왔을 수도 있기 때문에.. 잘린 문자열은 배열로 전달함
    .map((v) => v.split("=")) //map, 배열개수만큼 map()내의 함수를 호출
    //각각의 문자열을 다시 = 로 잘라내고..
    //key value를 json object로 받아냄.
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v); //여기 decode가 있죠
      return acc;
    }, {});

//데이터 한글로 나올 때 =$ED어쩌구저쩌구
//영문자, 일부 특수키를 제외하고는 웹에서 request data는 모두 위의스타일로 변형돼서 전달된다..
//유저에게 입력받는 데이터, 한글은 encoding 되어 전달 되었고 그걸 다시 decoding한 것이다..

http
  .createServer(async (req, res) => {
    //요청 request에서 cookie 추출
    const cookies = parseCookies(req.headers.cookie);

    if (req.url.startsWith("/login")) {
      //submit해서 login action이 일어나면
      const url = new URL(req.url, "http://localhost:8080");
      //http://localhost:8080/login?name=kim 아마 이런식으로 넘어올거..
      const name = url.searchParams.get("name");
      //어떤 업무 로직 돌리고..

      //cookie 설정, 유저가 입력한 name을 그대로 cookie에 담을거
      const expire = new Date();
      expire.setMinutes(expire.getMinutes + 5); //5분
      res.writeHead(302, {
        //상태 코드값이 3xx이다.. 브라우저에게 지정한 url로 rediret하라는 명령
        location: "/",
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )};Expires=${expire.toGMTSctring()}; HttpOnly; Path=/`, //뒤에는 백틱으로
      });
      res.end(); //응답함.. 응답 body는 없다 header에 redirect 명령이 들어갔음으로 body데이터가 의미 없음.
    } else if (cookies.name) {
      //쿠키를 분석했더니 name데이터가 있다면, 이미 쿠키 값이 있으면..
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`${cookies.name} 님 안녕하세요.`);
    } else {
      const data = await fs.readFile(path.join(__dirname, "login.html"));
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    }
  })
  .listen(8080, () => {
    console.log("8080 포트로 서버가 구동되었음");
  });
