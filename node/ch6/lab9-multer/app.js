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
  //저장 위치 설정.. 클라우드 스토리지도 제공한다..
  storage: multer.diskStorage({
    destination(req, file, done) {
      //첫번째 매개변수가 null 이 아니면 에러다..
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
//file1은 html form 의 name, 파일을 구분하는..
app.post("/upload", upload.single("file1"), (req, res) => {
  console.log(req.file);
  res.send("ok");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
