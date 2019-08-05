const pool = require("./connection.js");
//review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, 

const getReviewsList = (id, count) => {
  let organizedData = { product: id, page: 0, count: count, results: [] };
  return pool
    .query(
      "SELECT distinct review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, url as photos FROM reviews LEFT JOIN reviews_photos ON reviews.id = reviews_photos.review_id where product_id = $1",
      [id]
    )
    .then(data => {
      organizedData.results = data.rows;
      return organizedData;
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  getReviewsList
};
