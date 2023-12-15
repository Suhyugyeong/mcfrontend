//성공했지만.. 단순 실수..
const fs1 = require("fs");
const crypto = require("crypto");

// 1. 작업 폴더에 quiz.txt 파일을 만들고 긴 신문기사를 복사해 넣는다.
const article =
  "11월 말 샘 올트먼 오픈AI 최고경영자(CEO)가 회사에서 쫓겨났다가 닷새 만에 복직했다. 이와 관련해 소문이 무성했지만, 그중 유력한 소식 하나는 오픈AI가 회사 정체성에 혼란이 올 만큼 고도로 발전된 인공지능(AI)을 개발하고 있다는 것이다. 바로 ‘Q*(큐스타) 알고리즘’으로 불리는 AI 개발 프로젝트다. 현재 베일에 싸인 채 개발되고 있는 Q* 알고리즘은 인류를 위협할 강력한 AI 기술이라는 점에서 오픈AI 안팎에서 찬반양론을 불러일으키고 있다.";
fs1.writeFile("./quiz.txt", article, (err) => {
  if (err) {
    throw err;
  }
  console.log("파일 생성 성공");
});
//??????????????????????
// 2. 해당 파일을 creatReadStream을 이용해서 읽어들인다.
const readStream = fs1.createReadStream("./quiz.txt", { highWaterMark: 16 });
const data = [];
readStream.on("data", (chunk) => {
  data.push(chunk);
});
let readData = "";
readStream.on("end", () => {
  // 읽기 끝난 후 이벤트 등록
  readData = Buffer.concat(data).toString();
  // console.log(readData)

  // 3. 읽기작업이 완료되면 aes-256-cbc 알고리즘으로 읽은 데이터를 암호화 한다.
  const algorithm = "aes-256-cbc";
  const key = process.env.QUIZ_KEY;
  const iv = process.env.QUIZ_IV;

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let result = cipher.update(readData, "utf8", "base64");
  result += cipher.final("base64");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let result2 = decipher.update(result, "base64", "utf8");
  result2 += decipher.final("utf8");
  console.log("복호화된 데이터", result2);

  const writeStream = fs1.createWriteStream("./quiz-chipher.txt");
  writeStream.write(result2);
  writeStream.end();
});

// console.log(readData)
// console.log(readData) 가 아래줄에 작성하셨다고 하더라도 위의 end 부분은 비동기 실행입니다.
//그럼으로 console.log(readData) 가 실행되는 시점은 데이터가 없는게 맞지 않을까요?
