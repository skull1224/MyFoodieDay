module.exports = function (app) {
    const category = require("../controllers/categoryController");

    // 계절 목록 조회
    app.get("/seasonCategory", category.readSeasonRestaurants);

    // 기분 목록 조회
    app.get("/moodCategory", category.readMoodRestaurants);
    
    // 전체 목록 조회
    app.get("/categoryAll", category.readAllRestaurants);

}