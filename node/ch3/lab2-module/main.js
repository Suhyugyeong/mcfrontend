//외부 모듈(파일)을 이용하려면 먼저 require 해야..
//module에서 공개한 것중 어떤것을? 선별적으로 받을 수 있다..
//{}내에 받고자 하는 것만 명시..
const { myData, myFun, MyClass } = require("./module1");
console.log(myData, myFun, MyClass);

//module.exports로 외부에서 공개한 것은 {}로 받을 수 없다!!
// const { data2, myFun2, MyClass2 } = require("./module2");
// console.log(data2, myFun2, MyClass2);

const module2 = require("./module2");
console.log(module2);

//받을 때 이름을 변경해서.. 공개이름:사용이름
// const { data3: data33, myFun22, MyClass3 } = require("./module3");
// console.log(data33, myFun22, MyClass3); //10 [Function: myFun3] [class MyClass3] 잘 받음

//json으로 공개된 것을 위처럼 받아도 되고
//공개된 것 전체를 모두 이용하겠다면 객체명으로 받아도 된다..
const module3 = require("./module3");
console.log(module3.data3, module3.myFun22, module3.MyClass3);
