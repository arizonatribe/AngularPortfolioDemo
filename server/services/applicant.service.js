var applicants = [],
		utilities = require('../services/utilities.js'),
		faker = require('faker');

module.exports.createApplicant = function(overrides) {
  var applicant = {
    id: faker.random.uuid(),
    name: overrides && overrides.name ? overrides.name : faker.name.findName(),
    phone: overrides && overrides.phone ? overrides.phone : faker.phone.phoneNumber(),
    coverLetter: overrides && overrides.coverLetter ? overrides.coverLetter : faker.lorem.paragraph(),
    email: overrides && overrides.email ? overrides.email : faker.internet.email(),
    avatar: faker.internet.avatar(),
    picture: faker.image.avatar(),
    applyingTo: overrides && overrides.company ? overrides.company : faker.company.companyName()
  };

  return utilities.createHelper(applicant, applicants);
};

module.exports.get = function(applicantId) {
  return utilities.getHelper(applicantId, applicants);
};

module.exports.set = function(applicant) {
  return utilities.updateHelper(applicant.id, applicant, applicants);
};

module.exports.delete = function(applicantId) {
  return utilities.deleteHelper(applicantId, applicants);
};

module.exports.list = function() {
  return applicants;
};
