console.log(process.env.PATH);
console.log(process.env.MY_MYSQL_KEY);
//많이 하는 실수 : 환경변수를 바꾸면 프로세스를 동적으로 인식하지 않기 때문에, 프로세스를 껐다가 다시 켜야함..
//처음엔 undefined
//cmd 창으로 돌려보면 내가 설정한 값 mysql 잘 나옴

setImmediate(() => {
  console.log("immediate");
});

process.nextTick(() => {
  console.log("nextTick");
});

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve().then(() => console.log("promise"));

//결과 순서
// nextTick
// promise
// timeout
// immediate
