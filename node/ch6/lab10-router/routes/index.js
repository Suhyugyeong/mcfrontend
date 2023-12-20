//앱의 기초 라우팅 등록..
const express = require("express");

//Router 객체를 하나 생성하고.. 이곳에.. 라우팅 정보 등록..
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    <h3>index main</h3>
    <p><a href="login">login</a></p>
    <p><a href="user">user main</a></p>
    <p><a href="product">product main</a></p>
  `);
});

//동일 url 의 요청을 request method 로 분리시켜 한꺼번에 등록할때 route()
router
  .route("/login")
  .get((req, res) => {
    res.send(`
      <h3>login</h3>
      <form method="post" action="login">
        <input type="text" name="id"/>
        <input type="submit" value="login"/>
      </form>
    `);
  })
  .post((req, res) => {
    res.send(`
      <h3>login result</h3>
      ${req.body.id}로 로그인 하셨습니다.
    `);
  });
//이 js 파일의 객체를 외부(app.js)에서 사용해야 한다..
module.exports = router;
