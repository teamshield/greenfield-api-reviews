const Pool = require("pg").Pool;

const pool = new Pool({
  user: "kevypark",
  host: "ec2-52-90-110-238.compute-1.amazonaws.com",
  database: "greenfield",
  password: "password",
  port: 5432
});

module.exports = pool;