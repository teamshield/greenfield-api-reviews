const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "3.83.242.18",
  database: "greenfield",
  password: "",
  port: 5432
});

module.exports = pool;