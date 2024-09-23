const { log } = require("winston");
const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const favoriteDao = require("../dao/favoriteDao");
const signDao = require("../dao/signDao")

// 오늘의 추천 식당 조회
exports.readTodayRestaurants = async function (request, response) {
    const { heart } = request.query;
  
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      try {
        const [rows] = await favoriteDao.selectTodayRestaurants(connection, heart);
  
        return response.send({
          result: rows,
          isSuccess: true,
          code: 200, // 요청 실패시 400번대 코드
          message: "오늘의 식당 목록 요청 성공",
        });
      } catch (err) {
        logger.error(`오늘의 식당 목록 Query error\n: ${JSON.stringify(err)}`);
        return false;
      } finally {
        connection.release();
      }
    } catch (err) {
      logger.error(`오늘의 식당 목록 DB Connection error\n: ${JSON.stringify(err)}`);
      return false;
    }
  };

// 좋아요 업데이트 
exports.updateLike = async function (request, response) {
    const { heart, title } = request.body;

    try{
        connection = await pool.getConnection(async (conn) => conn);
        try {
            if(heart){
                // 좋아요 업데이트
                await favoriteDao.addLike(connection, heart, title);
            } else {
                // 좋아요 삭제
                await favoriteDao.deleteLike(connection, heart, title);
            }
             return response.send({
                isSuccess: true,
                code: 200,
                Message: "좋아요 업데이트 성공!",
             });
        } catch (e) {
            logger.error(`좋아요 업데이트 에러 \n : ${JSON.stringify(e)}`);
            return response.send({
                isSuccess: false,
                code: 500,
                Message: "좋아요 업데이트 실패!",
            });
        } finally {
            connection.release();
        }
    } catch (e) {
        logger.error(`좋아요 업데이트 DB 에러 \n : ${JSON.stringify(e)}`);
        return response.send({
            isSuccess: false,
            code: 500,
            Message: "좋아요 업데이트 DB 에러!",
        });
    }
}