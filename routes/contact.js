let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/contact', function(req, res) {
	res.render('contact', {
		title: 'Contact Information'
	});
});

module.exports = router;
