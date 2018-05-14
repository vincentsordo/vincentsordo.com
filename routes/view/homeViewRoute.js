const express = require('express');
let router = express.Router();

// REMEMBER URL Mapping is not prefixed, because we are at home

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: 'Welcome!',
		age: Math.abs(new Date(Date.now() - new Date('1988-07-11').getTime()).getUTCFullYear() - 1970)
	});
});

module.exports = router;