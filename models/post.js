const database = require('../util/database');
const mongodb = require('mongodb');

class Post {
  constructor(author, title, content) {
    this.author = author;
    this.title = title;
    this.date = new Date();
    this.content = content;
    this.comments = [];
    this.like = 0; //for vote
  }

  addPost() {
    database.getDB().collection('posts').insertOne(this)
      .catch(err => {
        console.log('err: ', err);
      });
  }

  static getAll() {
    return database.getDB().collection('posts').find().toArray()
      .catch(err => {
        console.log('err: ', err);
      });
  }

  static getById(id) {
    return database.getDB().collection('posts').findOne({
        _id: new mongodb.ObjectId(id)
      })
      .then(result => result)
      .catch(err => {
        console.log('err: ', err);
      });
  }

  static deleteAllPosts() {
    database.getDB().collection('posts').deleteMany();
  }

  static deletePost(id) {
    database.getDB().collection('posts').deleteOne({
      _id: new mongodb.ObjectId(id)
    });
  }

  static updatePost(id, title, content) {
    return database.getDB().collection('posts')
      .updateOne({
        _id: new mongodb.ObjectId(id)
      }, {
        $set: {
          title,
          content
        }
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  static saveComment(postId, name, commentContent) {
    database.getDB().collection("posts")
      .updateOne({
        _id: new mongodb.ObjectId(postId)
      }, {
        $push: {
          comments: {
            date: new Date(),
            name,
            commentContent
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  static like(id, likes) {
    return database.getDB().collection('posts')
      .updateOne({
        _id: new mongodb.ObjectId(id)
      }, {
        $set: {
          like: likes
        }
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

}
module.exports = Post;