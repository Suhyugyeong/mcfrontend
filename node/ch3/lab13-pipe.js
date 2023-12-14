const fs = require("fs");
const zlib = require("zlib"); //노드 내장 모듈.. 파일 압축관련 지원..
//gz 으로 압축해 준다.. 만약 일반적인 zip 으로 압축하려면 별개의 모듈을 구해서..

//파일 복사 개념...
const readStream = fs.createReadStream("sample2.txt");
const writeStream = fs.createWriteStream("sample3.txt");
readStream.pipe(writeStream);

const zlibStream = zlib.createGzip();
const writeSteam2 = fs.createWriteStream("./sample2.txt.gz");
readStream.pipe(zlibStream).pipe(writeSteam2);
