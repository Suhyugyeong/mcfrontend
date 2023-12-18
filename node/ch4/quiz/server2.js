const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const users = {};

http
  .createServer(async (req, res) => {
    try {
      if (req.method === "GET") {
        const data = await fs.readFile(path.join(__dirname, "login.html"));
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        return res.end(data);
      } else if (req.method === "POST") {
        let body = "";
        req.on("data", (data) => {
          body += data;
        });
        return req.on("end", () => {
          console.log("post... ", body);
          const { id, password } = JSON.parse(body); //네트워킹 데이터는 문자열이다.. 이 문자열을 json 으로

          users["id"] = id;
          users["password"] = password;
          res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(JSON.stringify(users));
        });
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
