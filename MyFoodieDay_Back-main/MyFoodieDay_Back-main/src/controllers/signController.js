const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");
const signDao = require("../dao/signDao");

// 토큰 검증 -> 로그인 유지
exports.readJwt = async function (request, response) {
  const { userIdx, nickname } = request.verifiedToken;

  return response.send({
    result: {userIdx: userIdx, nickname: nickname },
    code: 200,
    message: "토큰 유효성 검사 통과"
  });
};

// 로그인
exports.createJwt = async function (request, response) {
  const { userID, password } = request.body;

  if( !userID || !password){
    return response.send({
      isSuccess: false,
      code: 400,
      message: "회원 정보를 입력해주세요!",
    });
  }

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      // DB 회원 유저 검증
      const [rows] = await signDao.isValidUsers(connection, userID, password);

      if (rows.length < 1){
        return response.send({
          isSuccess: false,
          code: 410,
          message: "회원 정보가 존재하지 않습니다!",
        });
      }

      const { userIdx, nickname } = rows[0];

      // JWT 발급
      const token = jwt.sign(
        { userIdx : userIdx, nickname : nickname }, 
        secret.jwtsecret 
      );

      return response.send({
        result: { jwt: token },
        isSuccess : true,
        code : 200,
        message : "로그인 성공",
      });
    } catch (e) {
      logger.error(`Jwt 쿼리 생성 에러 \n : ${JSON.stringify(e)}`);
      return false;
    } finally {
      conn.release();
    }
  } catch (e) {
    logger.error(`Jwt 생성 DB 연결 에러\n : ${JSON.stringify(e)}`);
    return false;
  }
};

// 회원 가입
exports.createUsers = async function (request, response) {
  const { userID, password, nickname } = request.body;

  // 데이터 검증
  const RegFilterID = /^[a-z]+[a-z0-9]{5,19}$/; // 아이디 정규식 영문자로 시작하는 영문자 또는 숫자 6-20
  const RegFilterPwd = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; // 비밀번호 정규식 8-16 문자, 숫자 조합
  const RegFilterNickname = /^[가-힣|a-z|A-Z|0-9|]{2,10}$/; // 닉네임 정규식 2-10 한글, 숫자 또는 영문

  if (!RegFilterID.test(userID)) {
    return response.send({
      isSuccess: false,
      code : 400,
      message : "아이디는 정규식 영문자로 시작하는 영문자 또는 숫자 6-20",
    });
  }
  if (!RegFilterPwd.test(password)) {
    return response.send({
      isSuccess: false,
      code : 400,
      message : "암호는 정규식 8-16 문자, 숫자 조합",
    });
  }
  if (!RegFilterNickname.test(nickname)) {
    return response.send({
      isSuccess: false,
      code : 400,
      message : "별명은 정규식 2-10 한글, 숫자 또는 영문",
    });
  }

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      // 아이디 중복 검사
      
      // DB 입력
      const [rows] = await signDao.insertUsers(
        connection,
        userID,
        password,
        nickname
      );

      // 입력된 유저 인덱스
      const userIdx = rows.insertId;

      // JWT 발급
      const token = jwt.sign(
        { userIdx : userIdx, nickname : nickname },
        secret.jwtsecret
      );

      return response.send({
        result : {jwt: token },
        isSuccess : true,
        code : 200,
        message : "회원 가입 성공!"
      });
    } catch (e) {
      logger.error(`createUsers 쿼리 에러 \n : ${JSON.stringify(e)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (e) {
    logger.error(`createUsers DB 에러 \n : ${JSON.stringify(e)}`);
    return false;
  }
};





// 예시 코드
exports.example = async function (req, res) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      // ES6 비구조 할당
      // const [a, b, c] = [1, 2, 3]
      const [rows] = await indexDao.exampleDao(connection);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`example Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};

