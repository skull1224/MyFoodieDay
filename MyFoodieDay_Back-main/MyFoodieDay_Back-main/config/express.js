const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
var cors = require("cors");

module.exports = function () {
  const app = express();
  /* 미들웨어 설정 */
  app.use(compression()); // HTTP 요청 압축 및 해제

  app.use(express.json()); // body 값 파싱

  app.use(express.urlencoded({ extended: true })); // form 으로 제출되는 값 파싱

  app.use(methodOverride()); // put, delete 요청 처리

  app.use(cors()); // 웹 브라우저 cors 설정 관리

  /* 직접 구현해야 하는 모듈 */
  // app.use(express.static("/home/ubuntu/food-map/front"));
  // app.use(express.static(process.cwd() + '/public'));

  /* 직접 구현해야 하는 모듈 */
  require("../src/routes/signRoute")(app);
  require("../src/routes/CategoryRoute")(app);
  require("../src/routes/searchRoute")(app);
  require("../src/routes/favoriteRoute")(app);

  return app;
};
