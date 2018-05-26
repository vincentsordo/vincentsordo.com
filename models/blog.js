let shortid = require('shortid');
let dynamoose = require('dynamoose');

// models
let BlogSchema = new dynamoose.Schema({
	id: {
		type: String,
		hashKey: true,
		default: shortid.generate()
	},
	title: {
		type: String,
		trim: true
	},
	text: {
		type: String,
		required: true,
		minLength: 1,
		trim: true
	},
	creator: {
		type: String,
		default: null
	}
},
{
	throughput: {read: 15, write: 5},
	timestamps: true
});

// add BlogSchema.methods here

// add BlogSchema.statics here


let Blog = dynamoose.model('blog', BlogSchema);

module.exports = {Blog};