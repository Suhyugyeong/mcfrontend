let data3 = 10;
function myFun3() {}
class MyClass3 {
  data3 = 30;
}

//가장 일반적인 형태..
//여러개를 json objecgt로
module.exports = {
  //json은 key:value 형태이지만, key와 value가 동일하다면 밑 처럼 써도 괜춘..
  data3,
  myFun22: myFun3, //myFun3을 외부에는 myFun22 로..
  MyClass3,
};
