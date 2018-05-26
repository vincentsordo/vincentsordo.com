let dynamoose = require('dynamoose');

// models
let UserSchema = new dynamoose.Schema({
		username: {
			type: String,
			hashKey: true
		},
		email: {
			type: String,
			rangeKey: true
		}
	},
	{
		throughput: {read: 15, write: 5},
		timestamps: true
	}
);


let User = dynamoose.model('user', UserSchema);

module.exports = {User};