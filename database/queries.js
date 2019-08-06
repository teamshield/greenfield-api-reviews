const pool = require("./connection.js");
//review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness,

const getReviewsList = (id, count) => {
  let organizedData = { product: id, page: 0, count: count, results: [] };
  return pool
    .query(
      "SELECT id as review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos FROM reviews WHERE id = $1 limit $2",
      [id, count]
    )
    .then(data => {
      organizedData.results = data.rows;
      return organizedData;
    })
    .catch(err => {
      return err;
    });
};

const getReviewsMetadata  = (id, count) => {
  let organizedData = {product_id: id};
  return pool.query()
}

module.exports = {
  getReviewsList
};
