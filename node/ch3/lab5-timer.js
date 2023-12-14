//모두 함수의 실행이 back ground 로 옮겨져서.. non-blocking 으로 실행된다..
const timeout = setTimeout(() => {
  console.log("timeout log");
}, 1500);

const interval = setInterval(() => {
  console.log("interval log");
}, 500);

const timeout2 = setTimeout(() => {
  console.log("timeout2 log");
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2000);

// 즉시 실행시켜야 하는 업무..
// 백그라운드에서 실행된다는 것이 중요..
const immediate = setImmediate(() => {
  console.log("immediate log");
});
const immediate2 = setImmediate(() => {
  console.log("immediate2 log");
});
clearImmediate(immediate2);

//immediate log
// interval log
// interval log
// timeout log
// interval log
