const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const { get777Reviews } = require("../database/queries.js");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/get777reviews", (req, res) => {
  get777Reviews((err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
