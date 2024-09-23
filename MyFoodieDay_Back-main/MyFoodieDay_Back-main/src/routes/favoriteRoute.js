module.exports = function (app) {
    const favorite = require("../controllers/favoriteController");

    //  좋아요 
    app.patch("/updateHeart", favorite.updateLike);

    // 오늘의 추천 
    app.get("/todayRecommend", favorite.readTodayRestaurants);
}