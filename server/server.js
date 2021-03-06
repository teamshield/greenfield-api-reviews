const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const {
  getReviewsList,
  getReviewsMetadata,
  postAddReview,
  putIncrementHelpfulness,
  putReported
} = require("../database/queries.js");

app.use(bodyParser.json());

//endpoints
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get(`/reviews/:product_id/list`, (req, res) => {
  let productId = parseInt(req.params.product_id);
  let count = req.body.count;
  getReviewsList(productId, count)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

app.get("/reviews/:product_id/meta", (req, res) => {
  let productId = parseInt(req.params.product_id);
  getReviewsMetadata(productId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

app.post("/reviews/:product_id", (req, res) => {
  let productId = parseInt(req.params.product_id);
  postAddReview(req.body, productId)
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

app.put("/reviews/helpful/:review_id", (req, res) => {
  let reviewId = parseInt(req.params.review_id);
  putIncrementHelpfulness(reviewId)
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(400);
      
    });
});

app.put("/reviews/report/:review_id", (req, res) => {
  let reviewId = parseInt(req.params.review_id);
  putReported(reviewId)
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});


//deployment
app.get('/loaderio-a4260020745ba91e932e56e447ebffd1/', (req, res) => {
  res.sendFile('/root/greenfield-api-reviews/loader/loaderio-a4260020745ba91e932e56e447ebffd1.txt')
})

app.get('/healthcheck', (req, res) => {
  res.sendStatus(200);
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
