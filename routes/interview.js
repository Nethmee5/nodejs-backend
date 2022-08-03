var express = require("express");
const puppeter = require("puppeteer");
var router = express.Router();
const { QueryExecute } = require("./mysq_database");



var array = [{
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "first_name": "Gihan",
    "last_name": "Wijesinghe",
    "added_date": "06-28-2022"
    },
    
    {
        "user_id": "22334532-e89b-12c3-be35-426614223221",
        "first_name": "Asanka",
        "last_name": "De Silva",
        "added_date": "06-28-2022"
    }]

//1 register end point POST
router.post("/register", function (req, res, next) {
  const { user_id, first_name,last_name,added_date } = {
    user_id: req.body?.user_id,
    first_name: req.body?.first_name,
    last_name: req.body?.last_name,
    added_date: req.body?.added_date
  };
  if (user_id && first_name && last_name && added_date) {
 var query = `INSERT INTO users (user_id,first_name,last_name,added_date) VALUES ('${user_id}','${first_name}','${last_name}','${added_date}')`
    QueryExecute(query)
      .then((result) => {
        if (result) {
          res.send({
            status: true,
            data: { error: "no", user_id: user_id, first_name: first_name, last_name: last_name, added_date:added_date },
            mysqldb: result,
          });
        }
      })
      .catch((err) => {
        if (err) {
          res.send({
            status: true,
            data: { error: "yes", user_id: user_id, first_name: first_name, last_name: last_name, added_date:added_date  },
            mysqldb: err,
          });
        }
      });
  } else {
    res.send({
      status: false,
      data: {
        error: "No data for user_id/first_name/last_name/dded_date",
        data: { error: "yes", user_id: user_id, first_name: first_name, last_name: last_name, added_date:added_date  },
      },
      mysqldb: {},
    });
  }
});
//2 list end point  GET
router.get("/list", function (req, res, next) {
    var query = "SELECT * FROM users";
    QueryExecute(query)
        .then((result) => {
            var sts = false;
            if (result.length > 0) { sts = true; }
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(200).send({ status: sts, data: { 'error': "Yes", mysqldb: result }});
            }
        })
        .catch((err) => {
            if (err) {
                res.send({ status: false, data: { 'error': "yes",  }, mysqldb: err });
            }
        });
});

module.exports = router;
