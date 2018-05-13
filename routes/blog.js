const express = require('express');
let {Blog} = require('../models/blog.js');
let router = express.Router();

const DEFAULT_LIMIT = 10;

router.get('/', (req, res) => {
	res.render('blog/listing');
});


// get recent blogs
router.get('/recent', (req, res) => {
	let blogEntries = Blog.find()
							.limit(DEFAULT_LIMIT)
							.sort('-createdTime'); // sort descending
	res.send(blogEntries);
});

router.post('/', async (req, res) => {
	let newBlogPost = new Blog({
		title: req.body.title,
		text: req.body.text,
		createdTime: new Date().getTime()
	});

	console.log('i got here', newBlogPost);

	try {
		let doc = await newBlogPost.save();
		res.send(doc);
	} catch (e) {
		res.status(400).send(e);
	}
});


module.exports = router;