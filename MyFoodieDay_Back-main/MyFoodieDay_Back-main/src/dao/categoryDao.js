const { pool } = require("../../config/database");

// 전체 식당 선택
exports.selectAllRestaurants = async function (conn, season){
    const selectAllRestaurantsQuery = `SELECT title, address, season, mood FROM restaurantsInfo WHERE status = 'A';`;
 
    const rows = await conn.query(selectAllRestaurantsQuery);

    return rows;
}


// 계절 별 식당 선택
exports.selectSeasonRestaurants = async function (conn, season){
    const selectAllRestaurantsQuery = `SELECT title, address, season FROM restaurantsInfo WHERE status = 'A';`;
    const selectSeasonRestaurantsQuery = `SELECT title, address, season FROM restaurantsInfo WHERE status = 'A' and season = ?;`;

    const Params = [ season ];

    // season 이 넘어왔다면 selectSeasonRestaurantsQuery , 그게 아니라면 selectAllRestaurantsQuery
    const Query = season ? selectSeasonRestaurantsQuery : selectAllRestaurantsQuery
 
    const rows = await conn.query(Query, Params);

    return rows;
}

// 기분 별 식당 선택
exports.selectMoodRestaurants = async function (conn, mood){
    const selectAllRestaurantsQuery = `SELECT title, address, mood FROM restaurantsInfo WHERE status = 'A';`;
    const selectMoodRestaurantsQuery = `SELECT title, address, mood FROM restaurantsInfo WHERE status = 'A' and mood = ?;`;

    const Params = [ mood ];

    // season 이 넘어왔다면 selectSeasonRestaurantsQuery , 그게 아니라면 selectAllRestaurantsQuery
    const Query = mood ? selectMoodRestaurantsQuery : selectAllRestaurantsQuery
 
    const rows = await conn.query(Query, Params);

    return rows;
}