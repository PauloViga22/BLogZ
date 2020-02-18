const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

router.get('/', controller.getHomePage);
router.get('/posts/form', controller.getFormPage);
router.get('/posts/:id/form', controller.getFormPage);
router.post('/posts', controller.addPost);
router.put('/posts/:id/update', controller.updatePost);

router.put('/posts/like/:id', controller.liker);

router.get('/posts/:id', controller.getPostDetailPage);
router.delete('/posts', controller.deleteAllPosts);
router.delete('/posts/:id', controller.deletePost);
router.post('/posts/:id/comments', controller.saveComment);


module.exports = router;