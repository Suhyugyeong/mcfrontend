//시스템 변수 설정 확인: YOUR_AES_KEY와 YOUR_AES_IV를 올바르게 시스템 변수로 설정했는지 확인합니다. 프로그램이 실행되는 환경에서 이 변수들이 정의되어 있어야 합니다.

const fs = require("fs");
const crypto = require("crypto");

const algorithm = "aes-256-cbc";

// 시스템 변수에서 키와 IV 가져오기
const key = process.env.YOUR_AES_KEY;
const iv = process.env.YOUR_AES_IV;

// 키와 IV가 없을 경우 오류 처리
if (!key || !iv) {
  console.error("Error: Key or IV not provided.");
  process.exit(1); // 프로그램 종료
}

// 키와 IV를 Buffer로 변환
const keyBuffer = Buffer.from(key, "hex");
const ivBuffer = Buffer.from(iv, "hex");

// 암호화 함수
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, keyBuffer, ivBuffer);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// 파일 읽기 스트림 및 쓰기 스트림
const readStream = fs.createReadStream("./quiz.txt", { highWaterMark: 16 });
const writeStream = fs.createWriteStream("quiz-chipher.txt");

// 데이터 읽기 및 암호화 후 파일에 쓰기
readStream.on("data", (chunk) => {
  const encryptedChunk = encrypt(chunk);
  writeStream.write(encryptedChunk, "utf-8");
});

readStream.on("end", () => {
  writeStream.end();
  console.log(
    "Encryption complete. Encrypted text has been written to quiz-chipher.txt"
  );
});

readStream.on("error", (err) => {
  console.error("Error reading stream:", err);
});

writeStream.on("error", (err) => {
  console.error("Error writing to file:", err);
});
