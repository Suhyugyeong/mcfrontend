//브라우저에서 실행시킬 것이 아니다...
//브라우저의 내장 객체를 이용하면 안 된다..
function helloNode() {
  console.log("my first node~!");
}
function helloWorld() {
  console.log("언제까지 헬로월드인가..");
  helloNode();
}
helloWorld();
