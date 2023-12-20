const express = require("express");
const indexRouter = require("./routes"); //파일명 생략하면 index
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(express.urlencoded({ extended: true }));

//각각의 파일로 분리된 라우팅 정보를 조합만 하면 된다..
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
