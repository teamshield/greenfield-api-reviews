const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "172.31.93.157",
  database: "greenfield",
  password: "",
  port: 5432
});

module.exports = pool;