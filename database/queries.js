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
      "SELECT recommend, characteristics_name, characteristics_id, characteristics_value, rating FROM reviews WHERE product_id = $1",
      [id]
    )
    .then(data => {
      console.log(data.rows);
      //handling ratings
      for (let i = 0; i < data.rows.length; i++) {
        if (organizedData.ratings.hasOwnProperty(data.rows[i].rating)) {
          organizedData.ratings[data.rows[i].rating]++;
        }
      }
      //handling recommended
      for (let i = 0; i < data.rows.length; i++) {
        if (data.rows[i].recommend === true) {
          organizedData.recommended[1]++;
        } else {
          organizedData.recommended[0]++;
        }
      }
      //trimming charName
      let characteristicsName =
        data.rows[data.rows.length - 1].characteristics_name;
      characteristicsName = characteristicsName.slice(0, -1);
      characteristicsName = characteristicsName.substring(1);

      //handling averaging out charValues
      let preAveragedCharValue = [];

      for (let i = 0; i < data.rows.length; i++) {
        preAveragedCharValue.push(data.rows[i].characteristics_value);
      }

      let nonDividedCharValueArr = [0, 0, 0, 0];
      for (let i = 0; i < preAveragedCharValue.length; i++) {
        if (preAveragedCharValue[i][0]) {
          nonDividedCharValueArr[0] += preAveragedCharValue[i][0];
        }
        if (preAveragedCharValue[i][1]) {
          nonDividedCharValueArr[1] += preAveragedCharValue[i][1];
        }
        if (preAveragedCharValue[i][2]) {
          nonDividedCharValueArr[2] += preAveragedCharValue[i][2];
        }
        if (preAveragedCharValue[i][3]) {
          nonDividedCharValueArr[3] += preAveragedCharValue[i][3];
        }
      }

      //keeps track of # occurance of indexes at each characteristic value for averageCharValueArr
      let valueOccurance = [0, 0, 0, 0];
      for (let i = 0; i < data.rows.length; i++) {
        for (let j = 0; j < data.rows[i].characteristics_value.length; j++) {
          if (data.rows[i].characteristics_value[j]) {
            valueOccurance[j]++;
          }
        }
      }

      //averages out my char values
      let averagedCharValueArr = nonDividedCharValueArr.map((ele, i) => {
        return (
          Math.round(
            (ele /
              valueOccurance.slice(
                0,
                data.rows[data.rows.length - 1].characteristics_value.length
              )[i]) *
              100
          ) / 100
        );
      });
      // handling characteristics
      for (
        let i = 0;
        i < data.rows[data.rows.length - 1].characteristics_id.length;
        i++
      ) {
        organizedData.characteristics[characteristicsName.split(",")[i]] = {
          id: data.rows[0].characteristics_id[i],
          value: averagedCharValueArr[i].toString()
        };
      }

      return organizedData;
    })
    .catch(err => {
      return err;
    });
};

const postAddReview = data => {
  console.log(data);
  return pool
    .query(
      "INSERT INTO reviews (product_id, rating, body, recommend, characteristics_id, characteristics_value, reviewer_name, reviewer_email, photos) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        data.id,
        data.rating,
        data.body,
        data.recommend,
        Object.keys(data.characteristics),
        Object.values(data.characteristics),
        data.name,
        data.email,
        data.photos
      ]
    )
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  getReviewsList,
  getReviewsMetadata,
  postAddReview
};
