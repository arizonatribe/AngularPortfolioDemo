var companies = [],
		utilities = require('../services/utilities.js'),
		faker = require('faker'),
		_ = require('underscore');

module.exports.createCompany = function(overrides) {
	var company = {
		id: faker.random.uuid(),
		name: overrides && overrides.name ? overrides.name : faker.company.companyName(),
		phone: overrides && overrides.phone ? overrides.phone : faker.phone.phoneNumber(),
		slogan: overrides && overrides.slogan ? overrides.slogan : faker.company.catchPhrase(),
		picture: faker.image.business()
	};

	return utilities.createHelper(company, companies);
};

module.exports.get = function(companyId) {
	return utilities.getHelper(companyId, companies);
};

module.exports.set = function(company) {
	return utilities.updateHelper(company.id, company, companies);
};

module.exports.delete = function(companyId) {
	return utilities.deleteHelper(companyId, companies);
};

module.exports.list = function() {
	return companies;
};