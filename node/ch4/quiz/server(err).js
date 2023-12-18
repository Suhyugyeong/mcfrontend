//public rest 참고
const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const users = {};
http
  .createServer(async (req, res) => {
    try {
      if (req.method === "GET") {
        if (req.url === "/") {
          //get방식 요청시 login.html을 전송
          const data = await fs.readFile(path.join(__dirname, "login.html"));
          res.writeHead(200, { "Content-Type": "text/html; charset = utf-8" });
          return res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile(path.join(__dirname, "login.html"));
          res.writeHead(200, { "Content-Type": "text/html; charset = utf-8" });
          return res.end(data);
        } else if (req.url === "/users") {
          res.writeHead(200, {
            "Content-Type": "application/json; charset = utf-8",
          });
          return res.end(JSON.stringify(users));
        }try{
            const data = await fs.readFile(path.join(__dirname, req.url))
        return res.end(data);
        }catch(err){
            console.log("error!!")
        }
      } else if (req.method === "POST") {
        if (req.url === "/user") {
          let body = " ";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            alert(`id: ${ID} , password: ${PW}`);
            const { name } = JSON.parse(body); //네트워킹 데이터는 문자열이기 때문에 이걸 json으로 만들자
            const id = Date.now(); //유저를 식별할 id값으로 사용하려고..
            users[id] = name;
            res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("등록성공");
        })
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
