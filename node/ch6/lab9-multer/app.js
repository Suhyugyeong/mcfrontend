//npm i multer
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

//설정..
const upload = multer({
  //multer는 express와 함께 사용
  //저장 위치 설정.. 클라우드 스토리지도 제공한다..
  storage: multer.diskStorage({
    //multer.diskStorage는 multer 미들웨어에서 사용할 수 있는 저장소 엔진을 생성하기 위한 함수입니다.
    //이 함수는 두 개의 옵션을 가지고 있습니다: destination과 filename.
    destination(req, file, done) {
      //첫번째 매개변수가 null 이 아니면 에러다..
      done(null, "uploads/"); //콜백 함수로, 첫 번째 매개변수에는 에러를 전달하고, 두 번째 매개변수에는 저장될 폴더의 경로를 전달합니다.
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      // 이 함수는 파일의 원래 이름에서 확장자를 추출합니다. 예를 들어, 파일 이름이 example.jpg라면 .jpg를 반환합니다.
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      // 이 함수는 파일의 원래 이름에서 확장자를 제외한 부분을 반환합니다. 즉, 위의 예에서는 example을 반환합니다.
      //ext는 파일의 확장자를 저장하는 변수입니다. 이를 이용해 새로운 파일 이름을 구성하는데 사용
      //Date.now()를 통해 파일 이름이 겹치치 않도록
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
//file1은 html form 의 name, 파일을 구분하는..
//Express.js 애플리케이션에서 파일 업로드를 처리하는 라우터를 정의하고 있습니다.
app.post("/upload", upload.single("file1"), (req, res) => {
  //single("file1")은 클라이언트에서 전송된 요청에서 하나의 파일만을 처리하도록 설정한 것입니다.
  //"file1"은 폼에서 파일을 업로드하는 input 필드의 이름을 나타냅니다.
  console.log(req.file);
  res.send("ok");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
