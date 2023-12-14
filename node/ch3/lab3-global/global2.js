const { sayHello } = require("./global1");

global.message = "world";
//원래 hello였는데 world로 바꾼 상태..

sayHello();
//world가 나옴
