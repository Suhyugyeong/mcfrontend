const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const resData = {}; //서버에 사용할 응답 데이터를 담을 객체 resData를 초기화

http
  .createServer(async (req, res) => {
    if (req.method === "GET") {
      const data = await fs.readFile(path.join(__dirname, "login.html"));
      //__dirname은 현재 실행 중인 스크립트 파일이 위치한 디렉토리의 경로를 나타내는 node.js의 전역 변수
      //path.join 메서드를 사용해 현재 디렉토리와 login.html 파일의 상대 경로를 조합해서 전체 파일 경로를 생성 -> 스크립트 파일이 위치한 디렉토리에서 login.html 파일을 가리킴
      //fs.readFile(path, options): 파일 시스템(fs) 모듈의 readFile 메서드를 사용하여 파일을 비동기적으로 읽습니다. path는 읽을 파일의 경로이고, options는 옵션입니다.
      //여기서는 옵션을 생략하고 있으므로 기본적으로 텍스트 모드로 파일을 읽어옵니다.
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(data);
      //data와 end 같은 건 node.js에서 제공하는 이벤트로, EventEmitter 클래스를 기반으로 한다.
    } else if (req.method === "POST") {
      //유저 전달 데이터 받기..
      let reqData = "";
      req.on("data", (data) => {
        reqData += data;
      });
      req.on("end", () => {
        //JSON 형식의 데이터 파싱
        const { id, password } = JSON.parse(reqData);
        resData["id"] = id;
        resData["password"] = password;

        //응답 설정 및 전송
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        //writeHead는 http 응답의 헤더를 설정하는데 사용되는 node.js의 메서드
        //http 헤더는 클라이언트에게 전송되는 메타데이터로 요청과 응답 사이에 전달되는 정보를 포함
        //res.writeHead(statusCode 200은 OK 404는 NOT FOUND, [statusMessage], [headers]);
        //text/plain: 일반 텍스트를 나타냅니다. 이 경우, 본문은 텍스트로 이루어져 있으며, 브라우저는 이를 텍스트로 해석하여 사용자에게 표시합니다.
        //text/html: HTML 문서를 나타냅니다. 본문이 HTML로 작성되었을 때 사용됩니다.
        //application/json: JSON 데이터를 나타냅니다. 이 경우, 본문이 JSON 형식의 데이터일 때 사용됩니다.
        //image/jpeg, image/png: 각각 JPEG 및 PNG 형식의 이미지를 나타냅니다.
        res.end(JSON.stringify(resData));
      });
    }
  })
  .listen(8080, () => {
    console.log("서버 구동");
  }); //서버가 대기할 포트 8080, 서버는 listen 메서드를 호출함으로써 구동
//정상 실행되면 두 번째 매개변수로 전달된 콜백 함수 실행
//비동기적 과정
