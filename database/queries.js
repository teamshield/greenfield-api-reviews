const pool = require("./connection.js");

const get777Reviews = callback => {
  pool.query("SELECT * FROM reviews where id = 777", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data.rows)
      callback(null, data.rows);
    }
  });
};

module.exports = {
  get777Reviews
};
