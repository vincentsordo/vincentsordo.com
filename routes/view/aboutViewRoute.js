const express = require('express');
let router = express.Router();

// REMEMBER URL Mapping is prefixed with '/about'

/* GET about page. */
router.get('/', function(req, res) {
	res.render('about', {
		title: 'About'
	});
});

module.exports = router;