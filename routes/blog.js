const express = require('express');
let {Blog} = require('../models/blog.js');
let router = express.Router();
const {ObjectID} = require('mongodb');


const DEFAULT_LIMIT = 10;

// view routes
router.get('/listing', (req, res) => {
	return res.render('blog/listing');
});

router.get('/post/:id', (req, res) => {
	return res.render('blog/post', {
		postId: req.params.id
	});
});


// api routes
// get recent blogs
router.get('/recent', (req, res) => {
	Blog.find({})
		.limit(DEFAULT_LIMIT)
		.sort('-createdTime')
		.exec((err, docs) => {
			console.log(err);
			console.log(docs);

			if (err) {
				res.status(400).send(err);
			} else {
				res.send(docs);
			}
		});
});

router.get('/:id', async (req, res) => {
	let blogPostId = req.params.id;

	if (!ObjectID.isValid(blogPostId)) {
		return res.status(404).send({message: 'Invalid id'});
	}

	try {
		// get blog post by id
		let blogPost = await Blog.findOne({_id: blogPostId});
		if (!blogPost) {
			res.status(400).send({message: 'Id not found'});
		} else {
			res.send(blogPost);
		}
	} catch(e) {
		res.send(400).send({message: 'Internal error'});
	}
});

router.post('/add', async (req, res) => {
	let newBlogPost = new Blog({
		title: req.body.title,
		text: req.body.text,
		createdTime: new Date().getTime()
	});

	try {
		let newPost = await newBlogPost.save()
		res.send(newPost);
	} catch(e) {
		res.status(400).send(e);
	}
});


module.exports = router;