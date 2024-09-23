const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const categoryDao = require("../dao/categoryDao");

// 전체 식당 조회
exports.readAllRestaurants = async function (request, response) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await categoryDao.selectAllRestaurants(connection);

      return response.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "전체 식당 목록 요청 성공",
      });
    } catch (err) {
      logger.error(`전체 식당 목록 Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`전체 식당 목록 DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};

// 계절 별 식당 조회
exports.readSeasonRestaurants = async function (request, response) {
  const { season } = request.query;

  // 유효성 체크
  if (season) {
    const validCategory = [
      "봄",
      "여름",
      "가을",
      "겨울",
    ];

    if (!validCategory.includes(season)){
      return response.send({
        isSuccess: false,
        code: 400,
        message: "유효한 카테고리가 아닙니다!",
      });
    }
  }
  
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await categoryDao.selectSeasonRestaurants(connection, season);

      return response.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "계절 별 식당 목록 요청 성공",
      });
    } catch (err) {
      logger.error(`계절 별 식당 목록 Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`계절 별 식당 목록 DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};

// 기분 별 식당 조회
exports.readMoodRestaurants = async function (request, response) {
  const { mood } = request.query;

  // 유효성 체크
  if (mood) {
    const validCategory = [
      "슬픔",
      "짜증",
      "행복",
      "꿀꿀",
    ];

    if (!validCategory.includes(mood)){
      return response.send({
        isSuccess: false,
        code: 400,
        message: "유효한 카테고리가 아닙니다!",
      });
    }
  }
  
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await categoryDao.selectMoodRestaurants(connection, mood);

      return response.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "기분 별 식당 목록 요청 성공",
      });
    } catch (err) {
      logger.error(`기분 별 식당 목록 Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`기분 별 식당 목록 DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};