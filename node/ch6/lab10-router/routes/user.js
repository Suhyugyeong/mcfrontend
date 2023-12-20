const express = require("express");

const router = express.Router();

//유저 업무와 관련된 라우팅이 등록되는 파일..

//~~~/user/ 로 들어온 경우... /user 는 app.js 에서 등록할 거다..
router.get("/", (req, res) => {
  res.send(`
    <h3>user main</h3>
    <p><a href="user/add">user add</a></p>
    <p><a href="user/list">user list</a></p>
  `);
});

//~~~/user/add
router.get("/add", (req, res) => {
  res.send("<h3>user add</h3>");
});
//~~~/user/list
router.get("/list", (req, res) => {
  res.send("<h3>user list</h3>");
});

module.exports = router;
//현재 모듈에서 router 객체를 외부로 내보내겠다는 의미입니다.
