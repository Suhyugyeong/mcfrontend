const fs = require("fs");

//원하는 파일이 있는지? 있다면 read/write가 가능한지 판단
//access 함수 .. 없거나.. read/write가 불가능하다면 에러 발생..
// fs.access(
//   "./subdir",
//   fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
//   (err) => {
//     if (err) {
//       if (err.code === "ENOENT") {
//         //파일이 없는 경우
//         console.log("해당 폴더 없어요..");
//         fs.mkdir("./subdir", (err) => {
//           console.log("폴더 만들기 성공!");
//           fs.open("./subdir/file.js", "w", (error) => {
//             console.log("파일 생성 성공!");
//             fs.rename("./subdir/file.js", "./subdir/newfile.js", (err) => {
//               console.log("이름 바꾸기 성공!");
//             });
//           });
//         });
//       }
//     } else {
//       console.log("이미 존재하는 폴더네요..");
//     }
//   }
// );

//삭제..
fs.readdir("./subdir", (err, dir) => {
  console.log("폴더 내용", dir);
  //파일 삭제
  fs.unlink("./subdir/newfile.js", (err) => {
    console.log("파일 삭제 성공!");
    fs.rmdir("./subdir", (err) => {
      console.log("폴더 삭제 성공");
    });
  });
});
