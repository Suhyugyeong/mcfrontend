const string = "abc";
const number = 1;
const boolean = true;
const obj = {
  outer: {
    inside: {
      key: "value",
    },
  },
};

//매개변수는 개발자 임의 단어.. timeEnd()의 매개변수와 맞추기만 하면된다
//time()과 timeEnd()사이의 시간이 자동으로 측정된다..
console.time("전체시간");
//가장 기본 로그 출력
//매개변수 여러개.. 하나하나를 스페이스로 연결해서 출력해준다..
console.log(string, number, boolean); //abc 1 true

//객체 로깅은 dir()이 유용하다.. dir을 사용하면서 option 지정해서 depth를 설정 가능
//예를 들어, obj 처럼 중첩이 된 것들 볼 때 유리..
console.dir(obj, { colors: false, depth: 2 }); //{ outer: { inside: { key: 'value' } } }
console.dir(obj, { colors: true, depth: 1 }); //{ outer: { inside: [Object] } }

//로그를 테이블 형식으로도 출력이 가능하다..
console.table([
  { name: "kim", age: 30 },
  { name: "kee", age: 10 },
]);
//time은 중첩 가능, 어떻게 선언하든, 매개변수가 동일한 영역사이의 시간..
console.time("시간측정"); //시간측정: 1.048ms
for (let i = 0; i < 100000; i++) {}
console.timeEnd("시간측정");

function b() {
  //이 함수를 어디서 호출했는지를 추적하고자 할 때 이용
  //특히 디버깅할 때 유용
  console.trace("b 함수 호출 위치추적");
}
function a() {
  b();
}
a();

console.timeEnd("전체시간"); //전체시간: 32.462ms
