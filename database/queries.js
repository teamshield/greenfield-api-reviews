const pool = require("./connection.js");

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

const getReviewsMetadata = id => {
  let organizedData = {
    product_id: id,
    ratings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    recommended: { 0: 0, 1: 0 },
    characteristics: {}
  };
  return pool
    .query(
      "SELECT rating, recommend, characteristics_name, characteristics_id, characteristics_value FROM reviews WHERE id = $1",
      [id]
    )
    .then(data => {
      //handling ratings
      if (organizedData.ratings.hasOwnProperty(data.rows[0].rating)) {
        organizedData.ratings[data.rows[0].rating]++;
      }

      //handling recommended
      if (data.rows[0].recommend === true) {
        organizedData.recommended[1]++;
      } else {
        organizedData.recommended[0]++;
      }

      //trimming charName
      let characteristicsName = data.rows[0].characteristics_name;
      characteristicsName = characteristicsName.slice(0, -1);
      characteristicsName = characteristicsName.substring(1);

      // handling characteristics
      for (let i = 0; i < data.rows[0].characteristics_id.length; i++) {
        organizedData.characteristics[characteristicsName.split(",")[i]] = {
          id: data.rows[0].characteristics_id[i],
          value: data.rows[0].characteristics_value[i]
        };
      }

      return organizedData;
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  getReviewsList,
  getReviewsMetadata
};
