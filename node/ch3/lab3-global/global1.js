//앱 전역의 파일에서 이용할 변수, 함수, 클래스 등록
//global에 등록되어 있으면 별도의 export, require없이 사용 가능
//남발할 필요는 없다
global.message = "hello";

function sayHello() {
  console.log(global.message);
}

module.exports = {
  sayHello,
};
