const express = require("express");

const router = express.Router();

//상품 업무와 관련된 라우팅이 등록되는 파일..

//~~~/product/ 로 들어온 경우... /product 는 app.js 에서 등록할 거다..
router.get("/", (req, res) => {
  res.send(`
    <h3>product main</h3>
    <p><a href="product/add">product add</a></p>
    <p><a href="product/list">product list</a></p>
  `);
});

//~~~/product/add
router.get("/add", (req, res) => {
  res.send("<h3>product add</h3>");
});
//~~~/product/list
router.get("/list", (req, res) => {
  res.send("<h3>product list</h3>");
});

module.exports = router;
