const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "ec2-3-86-58-118.compute-1.amazonaws.com",
  database: "greenfield",
  password: "",
  port: 5432
});

module.exports = pool;