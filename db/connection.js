const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbName = 'hairdresserhelper';
const mongoUrl = `mongodb://localhost:27017/${dbName}`;

module.exports.insert = function(collection, record) {
  return MongoClient.connect(mongoUrl)
    .then(function(db) {
      return db.collection(collection)
        .insertOne(record)
        .then(function(res) {
          db.close();
          return Object.assign(record, {_id: res.insertedId});
        });
    });
};

module.exports.get = function(collection) {
  return MongoClient.connect(mongoUrl)
    .then(function(db) {
      return db.collection(collection).find({}).toArray()
        .then(function(docs){
          db.close();
          return docs;
        });
    });
};
