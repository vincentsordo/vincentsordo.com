const express = require('express');
let router = express.Router();

// REMEMBER URL Mapping is prefixed with '/contact'

/* GET contact page. */
router.get('/', function(req, res) {
	res.render('contact', {
		title: 'Email Me',
		formAction: '/api/v1/contact',
		formMethod: 'POST'
	});
});

module.exports = router;