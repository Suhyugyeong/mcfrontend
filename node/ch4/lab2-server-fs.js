const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async (req, res) => {
    try {
      //정상적으로 실행되는 부분..
      //promise.. async, await 로 작성 가능..
      //await 는 await 뒷 부분이 실행이 완료될때까지 대기..
      //대기했다가 결과 반환..
      //함수 내에서 await 를 사용하면.. 함수 선언부분에 async 명시..
      const data = await fs.readFile("./public/test.html");
      //response header 의 Content-Type 은 이 데이터를 받는 브라우저에게...
      //전송하는 데이터 타입을 명시하기 위해서..
      //text/html - 전송하는 데이터가 html 데이터다.. 브라우저는 html 파서를 구동
      //text/plain - 평문 문자열..
      //image/jpge - 브라우저는 body 의 데이터를 이미지 데이터로 인지해서 처리..
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

      res.end(data);
    } catch (err) {
      //try 영역이 실행되다가 에러가 발생할때 실행될 부분..
      console.error(err);
      //에러가 발생하면 에러가 났다고.. 클라이언트에 전송. 에러 메시지까지 전송..
      //에러 메시지가 클라이언트에게 전송하는 것은.. 클라이언트 화면도 지저분해 보이고
      //보안적으로도 좋지 않다..
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  })
  .listen(8080, () => {
    console.log("8080 포트로 서버 구동..");
  });
