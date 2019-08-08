const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "http://ec2-54-166-10-16.compute-1.amazonaws.com",
  database: "greenfield",
  password: "",
  port: 5432
});

module.exports = pool;