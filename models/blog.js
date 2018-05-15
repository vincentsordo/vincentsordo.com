const mongoose = require('mongoose');

// models
let BlogSchema = mongoose.Schema({
	title: {
		type: String,
		required:true,
		minLength:1,
		unique: true,
		trim: true
	},
	text: {
		type: String,
		required: true,
		minLength: 1,
		trim: true
	},
	createdTime: {
		type: Number,
		default: null
	},
	updatedTime: {
		type: Number,
		default: null
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: false
	}
});

// add BlogSchema.methods here
BlogSchema.methods.toJSON = function () {
	let blog = this;
	let blogObject = blog.toObject();

	// add created date to blog entry
	let date = new Date(blogObject.createdTime);
	blogObject.createdDate = date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear();

	return blogObject;

};

// add BlogSchema.statics here


let Blog = mongoose.model('blog', BlogSchema);
module.exports = {Blog};