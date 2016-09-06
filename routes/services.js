const express = require('express');
const app = express();

var router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const db = require('../db/connection');

router.route('/')
  .get(function(rq, rs) {
    db.get('services')
      .then(function(services){
        rs.json(services);
      });
  })
  .post(jsonParser, function(rq, rs) {
    if (!rq.body.name || !rq.body.time) {
      return rs.status(400).json({
        error: 'Missing parameters, you must send name and time',
      });
    }
    const service = {
      name: rq.body.name,
      time: rq.body.time,
    };
    db.insert('services', service)
      .then(function(savedService){
        rs.status(201).json(savedService);
      })
      .catch(function(error){
        rs.status(500).json({
          error: error
        });
      });
    
  });

module.exports = router;
