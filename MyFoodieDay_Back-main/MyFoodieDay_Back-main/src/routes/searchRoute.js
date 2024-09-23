module.exports = function (app) {
    const search = require("../controllers/searchController");

    // ai 검색
    app.get("/aiSearch", search.readAiRestaurants);

    // text 검색
    app.get("/textSearch", search.readTextRestaurants);
}