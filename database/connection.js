const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "greenfield-358002150.us-east-1.elb.amazonaws.com",
  database: "greenfield",
  password: "",
  port: 5432
});

module.exports = pool;