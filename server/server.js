const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const { getReviewsList } = require("../database/queries.js");

app.use(bodyParser.json());

//endpoints
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get(`/reviews/:product_id/list`, (req, res) => {
  let id = req.body.params.id;
  let count = req.body.params.count;
  getReviewsList(id, count)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
