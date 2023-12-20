//npm i nunjucks
const express = require("express");
const nunjucks = require("nunjucks");

const app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.get("/", (req, res) => {
  res.render("test", {
    name: "kim",
    count: 10,
    isCheck: true,
    datas: [10, 20, 30],
    obj: {
      data1: "hello",
      data2: "world",
    },
  });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
