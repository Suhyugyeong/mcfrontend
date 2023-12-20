const express = require("express");
const indexRouter = require("./routes"); //파일명 생략하면 index
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(express.urlencoded({ extended: true }));

//각각의 파일로 분리된 라우팅 정보를 조합만 하면 된다..
app.use("/", indexRouter);
// / 경로로 들어오는 모든 요청에 대해 indexRouter를 사용하도록 설정합니다. 예를 들어, 사용자가 애플리케이션의 루트 URL로 접근하면 indexRouter에 정의된 라우트 및 미들웨어가 실행됩니다.
app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 대기중");
});
