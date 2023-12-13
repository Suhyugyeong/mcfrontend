let data2 = 10;
function myFun2() {}
class MyClass2 {
  data2 = 30;
}

//외부에 노출시킨다..
//아래처럼 module.exports로 멤버를 공개하면 마지막 하나만 공개된다..!!
module.exports = data2;
module.exports = myFun2;
module.exports = MyClass2;
