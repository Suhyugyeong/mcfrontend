const exp = require("constants");
const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

//클라이언트 상태 정보(session) 을 저장하기 위한 변수..
const session = {};

http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    // console.dir(cookies)

    if (req.url.startsWith("/login")) {
      const url = new URL(req.url, "http://localhost:8080");
      const name = url.searchParams.get("name");

      const expire = new Date();
      expire.setMinutes(expire.getMinutes() + 5);
      console.log(expire);

      //실제 상태 데이터는 서버에 저장..
      //상태 데이터를 식별하기 위한 식별자(session id)를 준비..
      //session id 는 B/L 상 의미있는 데이터가 아니라.. 유저를 식별하기 위한 난수..
      const uniqueInt = Date.now();
      //uniqueInt 를 식별자(session id) 로 해서.. 상태 유지..
      session[uniqueInt] = {
        name,
        expire,
      };
      console.dir(session);
      //상태 데이터는 server side 에, session id 는 cookie 기술로 client side
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `session=${uniqueInt};Expires=${expire.toGMTString()};HttpOnly;Path=/`,
      });
      res.end();
    } else if (
      cookies.session &&
      session[cookies.session].expire > new Date()
    ) {
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(`${session[cookies.session].name} 님 안녕하세요.. `);
    } else {
      const data = await fs.readFile(path.join(__dirname, "login.html"));
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    }
  })
  .listen(8080, () => {
    console.log("8080 포트로 서버가 구동되었습니다.");
  });
