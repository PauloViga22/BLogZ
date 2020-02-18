const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let db = 'mongodb+srv://Tester:Test123@cluster0-5qo3r.azure.mongodb.net/test?retryWrites=true&w=majority';
// let dbced = 'mongodb+srv://user01:user01@cluster0-s10gx.mongodb.net/test?retryWrites=true&w=majority'

exports.mongoConnect = (callback) => {
  MongoClient.connect(db)
    .then(client => {
      db = client.db('ciccc');
      callback();
    }).catch(err => {
      console.log(err);
    });
};

exports.getDB = () => {
  if (db) {
    return db;
  } else {
    throw err;
  }
};