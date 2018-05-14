/* jshint node: true */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose.js');

let indexRouter = require('./routes/index');
let blogRouter = require('./routes/blog');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: false, // true = .sass and false = .scss
	sourceMap: true
}));

app.use(bodyParser.json());

app.use('/blog', blogRouter);
app.use('/', indexRouter);

// static pages (html) live in the public directory
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// handlebars helpers
hbs.registerHelper('currentYear', () => {
	return new Date().getFullYear();
});

module.exports = app;
