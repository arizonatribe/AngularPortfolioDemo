var jobs = [],
    utilities = require('../services/utilities.js'),
    faker = require('faker');

module.exports.createJobListing = function(overrides) {
  var job = {
    id: faker.random.uuid(),
    description: overrides && overrides.description ? overrides.description : faker.lorem.paragraph(),
    requirements: overrides && overrides.requirements ? overrides.requirements : faker.lorem.paragraphs()
  };

  return utilities.createHelper(job, jobs);
};

module.exports.get = function(jobId) {
  return utilities.getHelper(jobId, jobs);
};

module.exports.set = function(job) {
  return utilities.updateHelper(job.id, job, jobs);
};

module.exports.delete = function(jobId) {
  return utilities.deleteHelper(jobId, jobs);
};

module.exports.list = function() {
  if (!jobs.length) {
    for (var i = 0; i < 25; i++) {
      this.createJobListing();
    }
  }
  return jobs;
};
