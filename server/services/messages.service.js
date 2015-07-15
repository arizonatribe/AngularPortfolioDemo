var messages = [],
	faker = require('faker');

module.exports.createMessage = function(messageOverride) {
	var message = typeof messageOverride === 'string' ? messageOverride : faker.lorem.paragraph();

	messages.push(message);

	return message;
};

module.exports.get = function() {
	return messages;
};