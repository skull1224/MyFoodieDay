const jwt = require("jsonwebtoken");

const secret = "this is my secret";

const token = jwt.sign(
    { userIdx: 100, nickname: "정종현" }, // payload 정의
    secret // 서버 비밀 키
);

console.log(token);

const verifiedToken = jwt.verify(token, secret);
// const verifiedToken = jwt.verify(token, "secret");
// const verifiedToken = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.iRpaLSgIfkLRFTg_w8Dl8qOb4q81loPLevm1Zip9QOI", secret);

console.log(verifiedToken);