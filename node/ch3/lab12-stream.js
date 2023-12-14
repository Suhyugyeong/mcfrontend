const fs = require("fs");

//write stream,
// const writeStream = fs.createWriteStream("./sample3.txt");
// //연속적으로 파일을 write한다
// //wirte가 최종 끝난 다음에 처리할 로직이 있다면, 이벤트 등록
// writeStream.on("finish", () => {
//   console.log("finish~!");
// });
// writeStream.write("hello world1\n");
// writeStream.write("hello world2\n");
// writeStream.write("hello world3\n");
// writeStream.write("hello world4\n");
// writeStream.end();

//같은 파일에서 write, read 테스트
//모두 비동기로 실행되다 보니, 주석으로 막고 read 따로 테스트 하려고..
//옵션 버퍼 사이즈 지정.. 작게 설정하면 더 여러번 끊어서 읽음..
const readStream = fs.createReadStream("./sample3.txt", { highWaterMark: 8 });
const data = [];
//buffer에서 데이터가 전달된다면 버퍼가 full 되었을 때..
//흔히 buffer에 쌓인 데이터를 chunk라고 불러서..
readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data", chunk, chunk.length);
});
readStream.on("end", () => {
  console.log("end", Buffer.concat(data).toString());
});
readStream.on("error", () => {
  console.error(err);
});
