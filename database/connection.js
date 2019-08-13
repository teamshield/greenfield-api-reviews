const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "http://greenfield-364062280.us-east-1.elb.amazonaws.com",
  database: "greenfield",
  password: "",
  port: 5432
});

module.exports = pool;