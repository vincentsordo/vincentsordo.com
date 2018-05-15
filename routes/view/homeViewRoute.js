const express = require('express');
let router = express.Router();

// REMEMBER URL Mapping is not prefixed, because we are at home

/* GET home page. */
router.get('/', function(req, res) {
	res.render('home', {
		title: 'Welcome!',
		age: (new Date().getTime() - new Date('1988-07-11').getTime()) / 31540000000
	});
});

module.exports = router;