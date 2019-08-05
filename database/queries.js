const pool = require("./connection.js");

const getReviewsList = (id, count) => {
  return pool
    .query("SELECT * FROM reviews where id = $1 LIMIT $2", [id, count])
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  getReviewsList
};
