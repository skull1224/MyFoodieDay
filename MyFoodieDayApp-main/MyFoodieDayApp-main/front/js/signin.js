/*
로그인 API 연동

1. #signinBtn 클릭
2. #userID, #password 값 확인
3. 로그인 API 요청
4. 요청이 성공적이지 않다면, alert message
5. 요청이 성공하면, jwt를 localstorage에 저장하고 main page 이동

*/

let url = "http://127.0.0.1:3001";

const btnSignIn = document.querySelector("#signinBtn");

btnSignIn.addEventListener("click", signin);

async function signin(event) {
  const userID = document.querySelector("#userID").value;
  const password = document.querySelector("#password").value;

  // #userID, #password 값 확인
  if (!userID || !password) {
    return alert("아이디와 비밀번호를 입력해주세요.");
  }

  // 로그인 API 요청
  const signInReturn = await axios({
    method: "post", // http method
    url: url + "/sign-in",
    headers: {}, // packet header
    data: { userID: userID, password: password }, // packet body
  });

  // 요청이 성공적이지 않다면, alert message
  const isValidSignIn = signInReturn.data.code == 200;

  if (!isValidSignIn) {
    return alert("아이디 또는 비밀번호가 올바르지 않습니다.");
  }

  // 요청이 성공하면, jwt를 localstorage에 저장하고 main page 이동
  const jwt = signInReturn.data.result.jwt;
  localStorage.setItem("x-access-token", jwt);
  alert(signInReturn.data.message);

  return location.replace("./index.html");
}
