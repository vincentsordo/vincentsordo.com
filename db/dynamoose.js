let dynamoose = require('dynamoose');

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === "test") {
	//Configure dynamoose to use a DynamoDB local for testing.
	dynamoose.AWS.config.update({
		region: 'us-west-1',
	});
	dynamoose.local();
}