const express = require('express');
let router = express.Router();

// REMEMBER URL Mapping is prefixed with '/blog'

// view routes
router.get('/listing', (req, res) => {
	return res.render('blog/listing');
});

router.get('/post/:id', (req, res) => {
	return res.render('blog/post', {
		postId: req.params.id
	});
});

module.exports = router;