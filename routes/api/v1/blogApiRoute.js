const express = require('express');
let {Blog} = require('../../../models/blog.js');
let router = express.Router();
const _ = require('lodash');


const DEFAULT_LIMIT = 10;

// REMEMBER URL Mapping is prefixed with '/api/v1/blog/'

/**
 * Get recent routes
 */
router.get('/last/:n', (req, res) => {
	let limit = parseInt(req.params.n) || DEFAULT_LIMIT;

	try {
		Blog.scan()
			.limit(limit)
			.exec((err, blogs) => {
				console.log(blogs);
				if (err) {
					res.status(400).send(err);
				} else {
					res.send(blogs);
				}
			});
	} catch(e) {
		res.status(400).send(e);
	}
});

/**
 * Get post by id
 */
router.get('/:id', (req, res) => {
	let blogPostId = req.params.id;

	try {
		// get blog post by id
		Blog.queryOne({id: blogPostId}, (err, blogPost) => {
			if (err || !blogPost) {
				res.status(400).send({message: 'Id not found'});
			} else {
				res.send(blogPost);
			}
		});

	} catch(e) {
		res.send(400).send({message: 'Internal error'});
	}
});

/**
 * Create new blog post
 *
 * Expects that the blog title and text
 */
router.post('/', (req, res) => {
	try {
		let newBlogPost = new Blog({
			title: req.body.title,
			text: req.body.text
		});
		newBlogPost.save((err) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(200).send(newBlogPost);
			}
		});
	} catch(e) {
		res.status(400).send(e);
	}
});

/**
 * Updates an existing blog post
 */
router.patch('/:id', async (req, res) => {
	let blogPostId = req.params.id;

	let body = _.pick(req.body, ['title','text']);

	try {
		// update the blog post
		Blog.update({id:blogPostId}, body, (err) => {
			// 400 on error
			if (err) {
				res.status(400).send({error: err});
			} else {
				// get the updates blog post
				Blog.get({id: blogPostId}, (err, blogPost) => {
					if (err || !blogPost) {
						return res.status(400).send({error: 'Invalid Id'});
					} else {
						res.send(blogPost);
					}
				});
			}
		});
	} catch(e) {
		res.status(400).send({error: 'Internal error'});
	}
});

/**
 * Delete a blog post by id
 */
router.delete('/:id', (req, res) => {
	let blogPostId = req.params.id;

	try {
		// get blog post by id
		Blog.delete({id: blogPostId}, (err) => {
			if (err) {
				return res.status(400).send({error: 'Id not found'});
			}
		});

		res.send({message: 'success'});
	} catch(e) {
		res.send(400).send({error: 'Internal error'});
	}
});


module.exports = router;