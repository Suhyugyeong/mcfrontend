const path = require("path");

//__filename : 현재 노드가 실행되는 파일의 전체 경로를 받을 때 사용(더블언더스코어 사용)
const currentPath = __filename;
console.log("currentPath", currentPath);
console.log("path.dirname", path.dirname(currentPath));
console.log("extname", path.extname(currentPath));
console.log("basename", path.basename(currentPath));
console.log("parse", path.parse(currentPath));
