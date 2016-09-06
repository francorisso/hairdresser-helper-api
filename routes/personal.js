const express = require('express');
const app = express();

var router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const db = require('../db/connection');

router.route('/')
  .get(function(rq, rs) {
    db.get('personal')
      .then(function(personal){
        rs.json(personal);
      });
  })
  .post(jsonParser, function(rq, rs) {
    if (!rq.body.name) {
      return rs.status(400).json({
        error: 'Missing parameters, you must send name',
      });
    }
    const person = {
      name: rq.body.name,
      services: rq.body.services,
    };
    db.insert('personal', person)
      .then(function(savedPerson){
        rs.status(201).json(savedPerson);
      })
      .catch(function(error){
        rs.status(500).json({
          error: error
        });
      });
    
  });

module.exports = router;
