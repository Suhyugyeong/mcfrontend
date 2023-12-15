const fs = require("fs");
const crypto = require("crypto");

//시스템 변수 획득.
const key = process.env.QUIZ_KEY;
const iv = process.env.QUIZ_IV;
const algorithm = "aes-256-cbc";

console.log(key, iv);

//파일 read
const readStream = fs.createReadStream("./quiz.txt", { highWaterMark: 16 });
const data = [];
readStream.on("data", (chunk) => {
  data.push(chunk);
});
readStream.on("end", () => {
  //암호화
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let result = cipher.update(Buffer.concat(data).toString(), "utf8", "base64");
  result += cipher.final("base64");

  //파일 write
  const writeStream = fs.createWriteStream("./quiz-cipher.txt", {
    highWaterMark: 16,
  });
  writeStream.on("finish", () => {
    console.log("finish.........");
  });
  writeStream.write(result);
  writeStream.end();
});
readStream.on("error", () => {
  console.error(err);
});
