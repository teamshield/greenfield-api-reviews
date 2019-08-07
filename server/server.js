const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const {
  getReviewsList,
  getReviewsMetadata,
  postAddReview
} = require("../database/queries.js");

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

app.get("/reviews/:product_id/meta", (req, res) => {
  let id = req.body.params.id;
  getReviewsMetadata(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

app.post("/reviews/:product_id", (req, res) => {
  postAddReview(req.body)
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
