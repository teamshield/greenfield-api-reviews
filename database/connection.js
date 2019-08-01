const Pool = require("pg").Pool;

const pool = new Pool({
  user: "kevypark",
  host: "localhost",
  database: "greenfield",
  password: "",
  port: 5432
});

module.exports = pool;