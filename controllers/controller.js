const Post = require('../models/post');

exports.getHomePage = (req, res, next) => {
  Post.getAll().then(posts => {
    res.render('home', {
      posts
    });
  });
}

exports.getFormPage = (req, res, next) => {
  const {
    id
  } = req.params;
  const isEditing = !!id;
  let post = null;

  if (isEditing) {
    Post.getById(id).then(post => {
      res.render('form', {
        post
      });
    });
  } else {
    res.render('form', {
      post
    });
  }
}

exports.addPost = (req, res, next) => {
  const {
    author,
    title,
    content
  } = req.body;
  const post = new Post(author, title, content);
  post.addPost();
  res.redirect('/');
}

exports.updatePost = (req, res, next) => {
  const {
    id,
    title,
    content
  } = req.body;

  Post.updatePost(id, title, content);
  res.redirect('/posts/' + id);
}

exports.liker = (req, res, next) => {
  console.log("heyyy", req.body)
  console.log("toa quiiiiiii dd")
  let {
    id,
    like
  } = req.body;

  like = parseInt(like) + 1
  console.log("like: me dudeu", parseInt(like))
  Post.like(id, like);
  res.sendStatus(200)
  res.redirect('/posts/' + id);
}

exports.getPostDetailPage = (req, res, next) => {
  const {
    id
  } = req.params;

  Post.getById(id).then(post => {
    res.render('post-detail', {
      post
    });
  });
}

exports.deletePost = (req, res, next) => {
  const {
    id
  } = req.params;
  Post.deletePost(id);
  res.redirect('/');
}

exports.deleteAllPosts = (req, res, next) => {
  Post.deleteAllPosts();
  res.redirect('/');
};

exports.saveComment = (req, res, next) => {
  const {
    id
  } = req.params
  const {
    name,
    content
  } = req.body;
  Post.saveComment(id, name, content);
  res.redirect('/posts/' + id);
}