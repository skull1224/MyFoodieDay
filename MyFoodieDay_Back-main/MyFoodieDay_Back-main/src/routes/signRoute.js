module.exports = function (app) {
  const cert = require("../controllers/signController");
  const jwtMiddleware = require("../../config/jwtMiddleware");

  // 회원 가입
  app.post("/sign-up", cert.createUsers);

  // 로그인
  app.post("/sign-in", cert.createJwt);

  // 토큰 검증 -> 로그인 유지
  app.get("/jwt", jwtMiddleware, cert.readJwt);
  
};
