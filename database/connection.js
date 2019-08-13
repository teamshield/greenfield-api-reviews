const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1:5432",
  database: "greenfield",
  password: "",
  port: 5432
});

module.exports = pool;