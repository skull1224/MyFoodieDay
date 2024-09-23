const { pool } = require("../../config/database");

// 검색 식당 소개
exports.selectTextRestaurants = async function (conn, menu){
    const selectAllRestaurantsQuery = `SELECT title, address, menu FROM restaurantsInfo WHERE status = 'A';`;
    const selectTextRestaurantsQuery = `SELECT title, address, menu FROM restaurantsInfo WHERE status = 'A' and menu = ?;`;

    const Params = [ menu ];

    // season 이 넘어왔다면 selectSeasonRestaurantsQuery , 그게 아니라면 selectAllRestaurantsQuery
    const Query = menu ? selectTextRestaurantsQuery : selectAllRestaurantsQuery
 
    const rows = await conn.query(Query, Params);

    return rows;
}

// AI 추천 식당 소개
exports.selectAiRestaurants = async function (conn, menu){
    const selectAllRestaurantsQuery = `SELECT title, address, menu FROM restaurantsInfo WHERE status = 'A';`;
    const selectAiRestaurantsQuery = `SELECT title, address, menu FROM restaurantsInfo WHERE status = 'A' and menu = ?;`;

    const Params = [ menu ];

    // season 이 넘어왔다면 selectSeasonRestaurantsQuery , 그게 아니라면 selectAllRestaurantsQuery
    const Query = menu ? selectAiRestaurantsQuery : selectAllRestaurantsQuery
 
    const rows = await conn.query(Query, Params);

    return rows;
}