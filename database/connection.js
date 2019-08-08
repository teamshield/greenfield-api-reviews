const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "ec2-54-165-188-232.compute-1.amazonaws.com",
  database: "greenfield",
  password: "",
  port: 5432
});

module.exports = pool;