const { pool } = require("../../config/database");

// 로그인
exports.isValidUsers = async function (conn, userID, password){
  const Query = `SELECT userIdx, nickname FROM Users WHERE userID = ? and password = ? and status = 'A';`;
  const Params = [userID, password];

  const rows = await conn.query(Query, Params);

  return rows;
}

// 회원 가입
exports.insertUsers = async function (conn, userID, password, nickname) {
  const Query = `INSERT INTO Users(userID, password, nickname) values (?, ?, ?);`;
  const Params = [userID, password, nickname];

  const rows = await conn.query(Query, Params);

  return rows;
};

exports.compareID = async function (conn, userID) {
  const Query = `SELECT userID FROM Users WHERE userID = ?`
  const Params = [userID];

  const rows = await conn.query(Query, Params);

  return rows;
};


// 토큰 검증
exports.exampleDao = async function (connection) {
  const Query = `SELECT * FROM Students;`;
  const Params = [];

  const rows = await connection.query(Query, Params);

  return rows;
};