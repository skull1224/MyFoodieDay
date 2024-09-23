const { pool } = require("../../config/database");

// 오늘의 추천 식당 소개
exports.selectTodayRestaurants = async function (conn, heart){
    // const selectAllRestaurantsQuery = `SELECT title, address, heart FROM restaurantsInfo WHERE status = 'A';`;
    const selectTodayRestaurantsQuery = `SELECT title, address, heart FROM restaurantsInfo WHERE status = 'A' and heart = 1;`;

    // const Params = [ heart ];

    // season 이 넘어왔다면 selectSeasonRestaurantsQuery , 그게 아니라면 selectAllRestaurantsQuery
    // const Query = heart ? selectTodayRestaurantsQuery : selectAllRestaurantsQuery
    const Query = selectTodayRestaurantsQuery;
 
    const rows = await conn.query(Query);

    return rows;
}

// 좋아요 저장
exports.addLike = async function (conn, heart, title) {
    const Query = `UPDATE restaurantsInfo SET heart = ? WHERE title = ?;`;
    const Params = [heart, title];
  
    const [rows] = await conn.query(Query, Params);
  
    return rows;
  };

// 좋아요 제거
exports.deleteLike = async function (conn, heart, title) {
    const Query = `UPDATE restaurantsInfo SET heart = ? WHERE title = ?;`;
    const Params = [heart, title];
  
    const [rows] = await conn.query(Query, Params);
  
    return rows;
  };
  