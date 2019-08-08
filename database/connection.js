const Pool = require("pg").Pool;

const pool = new Pool({
  user: "i-015755f237f78b85e.123456789012.us-east-1.rds.amazonaws.com",
  host: "*",
  database: "greenfield",
  password: "",
  port: 5432
});

module.exports = pool;