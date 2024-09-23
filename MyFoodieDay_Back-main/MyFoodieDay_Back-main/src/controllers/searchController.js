const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const searchDao = require("../dao/searchDao");

// 검색 식당 조회
exports.readTextRestaurants = async function (request, response) {
    const { menu } = request.query;
  
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      try {
        const [rows] = await searchDao.selectTextRestaurants(connection, menu);
  
        return response.send({
          result: rows,
          isSuccess: true,
          code: 200, // 요청 실패시 400번대 코드
          message: "AI 추천 식당 목록 요청 성공",
        });
      } catch (err) {
        logger.error(`검색 식당 목록 Query error\n: ${JSON.stringify(err)}`);
        return false;
      } finally {
        connection.release();
      }
    } catch (err) {
      logger.error(`검색 식당 목록 DB Connection error\n: ${JSON.stringify(err)}`);
      return false;
    }
  };

// AI 추천 식당 조회
exports.readAiRestaurants = async function (request, response) {
  const { menu } = request.query;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await searchDao.selectAiRestaurants(connection, menu);

      return response.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "AI 추천 식당 목록 요청 성공",
      });
    } catch (err) {
      logger.error(`AI 추천 식당 목록 Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`AI 추천 식당 목록 DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};