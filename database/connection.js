const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "*",
  database: "greenfield",
  password: "",
  port: 5432
});

module.exports = pool;