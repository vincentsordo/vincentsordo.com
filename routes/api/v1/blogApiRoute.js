const express = require('express');
let {Blog} = require('../../../models/blog.js');
let router = express.Router();
const {ObjectID} = require('mongodb');
const _ = require('lodash');


const DEFAULT_LIMIT = 10;

// REMEMBER URL Mapping is prefixed with '/api/v1/blog/'

/**
 * Get recent routes
 */
router.get('/last/:n', (req, res) => {
	let limit = parseInt(req.params.n || DEFAULT_LIMIT);
	Blog.find({})
		.limit(limit)
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

/**
 * Get post by id
 */
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

/**
 * Create new blog post
 *
 * Expects that the blog title and text
 */
router.post('/', async (req, res) => {
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

/**
 * Updates an existing blog post
 */
router.patch('/:id', async (req, res) => {
	let blogPostId = req.params.id;

	if (!ObjectID.isValid(blogPostId)) {
		return res.status(404).send({message: 'Invalid id'});
	}

	let body = _.pick(req.body, ['title','text']);
	body.updatedTime = new Date().getTime();

	try {
		// get blog post by id
		let updatedBlogPost = await Blog.findOneAndUpdate(
			{_id: blogPostId},
			{$set: body},
			{new: true}
		);
		if (!updatedBlogPost) {
			return res.status(400).send({message: 'Id not found'});
		}

		res.send(updatedBlogPost);
	} catch(e) {
		res.send(400).send({message: 'Internal error'});
	}
});

router.delete('/:id', async (req, res) => {
	let blogPostId = req.params.id;

	if (!ObjectID.isValid(blogPostId)) {
		return res.status(404).send({message: 'Invalid id'});
	}

	try {
		// get blog post by id
		let blogPost = await Blog.findOneAndRemove({_id: blogPostId});
		if (!blogPost) {
			return res.status(400).send({message: 'Id not found'});
		}
		res.send(blogPost);
	} catch(e) {
		res.send(400).send({message: 'Internal error'});
	}
});


module.exports = router;