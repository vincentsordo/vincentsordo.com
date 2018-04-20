let express = require('express');
let emailValidator = require('email-validator');
let nodemailer = require('nodemailer');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Welcome!',
    age: Math.abs(new Date(Date.now() - new Date('1988-07-11').getTime()).getUTCFullYear() - 1970)
  });
});

/* GET about page. */
router.get('/about', function(req, res) {
	res.render('about', {
		title: 'About'
	});
});

/* GET contact page. */
router.get('/contact', function(req, res) {
	res.render('contact', {
		title: 'Email Me',
		formAction: '/contact',
		formMethod: 'POST'
	});
});

router.post('/contact', function(req, res) {
	let errors = [];

	if (!req.body.name.trim().length) {
		errors.push('Name is required');
	}
	if (!emailValidator.validate(req.body.email)) {
		errors.push('Invalid email');
	}
	if (!req.body.message.trim().length) {
		errors.push('Message is required');
	}

	if (errors.length) {
		return res.render('contact', {
			title: 'Email Me',
			errors,
			name: req.body.name,
			email: req.body.email,
			message: req.body.message,
			success: false
		});
	}

	let mailOptions = {
		from: 'me@vincentsordo.com',
		to: 'vsordo@gmail.com',
		subject: 'Contact Email From vincentsordo.com',
		text: req.body.message,
		html: `<p>${req.body.message}</p>`,
		date: new Date().getDate()
	};

	let transporter = nodemailer.createTransport('smtps://vincentsordowebsite%40gmail.com:vincentsordopassword@smtp.gmail.com');
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			errors.push(error);
		}

		let success = false;
		if (!info.rejected.length) {
			success = true;
			req.body.name = req.body.email = req.body.message = '';
		}

		return res.render('contact', {
			title: 'Email Me',
			errors,
			name: req.body.name,
			email: req.body.email,
			message: req.body.message,
			success
		});
	});

});


module.exports = router;
