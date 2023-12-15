//localhost:8080 으로 들어가봐용
//이 js파일은 backend에서 node에 의해 실행
//클라이언트 url 분석, method 분석으로 클라이언트가 요청한 적절한 업무 진행..
const http = require("http");
const fs = require("fs").promises;
const path = require("path");

//실전용이라면 유저 데이터가 DB에 저장되겠지만
//테스트용 .. 유저 데이터가 저장되는 변수
const users = {};

http
  .createServer(async (req, res) => {
    try {
      //restful 서비스를 하고자 하는 것이다
      //클라이언트 요청이 request method에 따라 상이하게 처리되어야 한다
      //요청 분석.. request method가 무엇이 들어왔는지..
      if (req.method === "GET") {
        //클라이언트 url분석해서 맞는 요청 처리
        if (req.url === "/") {
          //index.html을 클라이언트에게 전송
          //__dirname 서버가 실행되고 있는 현재의 디렉토리..(예약어)
          const data = await fs.readFile(
            path.join(__dirname, "public/rest/index.html")
          );
          res.writeHead(200, { "Content-Type": "text/html; charset = utf-8" });
          return res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile(
            path.join(__dirname, "public/rest/about.html")
          );
          res.writeHead(200, { "Content-Type": "text/html; charset = utf-8" });
          return res.end(data);
        } else if (req.url === "/users") {
          //html을 요청한 것이 아니라, 데이터를 요청한 것임
          //json 데이터를 클라이언트에게 넘길 때는 header 정보에 json이라고 명시해야..
          //브라우저가 그거에 맞게 대응
          res.writeHead(200, {
            "Content-Type": "application/json; charset = utf-8",
          });
          return res.end(JSON.stringify(users));
        }

        //위에 걸리지 않는 요청이 들어온다면..
        //css, js, 요청 등등
        //http://localhost:8080/public/rest/restFront.css 이런식으로 요청이 들어오면
        //req.url - public/rest/restFont.css
        const data = await fs.readFile(path.join(__dirname, req.url));
        return res.end(data);
      } else if (req.method === "POST") {
        if (req.url === "/user") {
          //클라이언트 요청에 넘어온 데이터 받고
          let body = " ";
          //스트림 방식으로 클라이언트 데이터를 받아서..
          req.on("data", (data) => {
            body += data;
          });
          //모두 읽은 후
          return req.on("end", () => {
            console.log("post...", body);
            const { name } = JSON.parse(body); //네트워킹 데이터는 문자열이기 때문에 이걸 json으로 만들자
            const id = Date.now(); //유저를 식별할 id값으로 사용하려고..
            users[id] = name;
            res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("등록성공");
          });
        }
      } else if (req.method === "PUT") {
        if (req.url.startsWith("/user/")) {
          //url에서 key값 획득하고
          const key = req.url.split("/")[2]; //split 문자열을 구분자로 나누어 배열로 리턴
          let body = "";
          //수정할 데이터 받아내서
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("put...", body);
            users[key] = JSON.parse(body).name;
            res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
            res.end(JSON.stringify(users));
          });
        }
      } else if (req.method === "DELETE") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          delete users[key];
          res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(users));
        }
      }
    } catch (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  })
  .listen(8080, () => {
    console.log("8080 서버 구동");
  });
