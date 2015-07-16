var jobs = require('../controllers/jobs.controller');

module.exports = function(app) {
  app.route('/jobs')
  .get(jobs.listAll);

  app.route('/companies/:companyId/jobs')
  .get(jobs.list)
  .post(jobs.createJobListing);

  app.route('/companies/:companyId/jobs/:jobId/applicants/:applicantId')
  .get(jobs.readApplication)
  .put(jobs.updateApplication)
  .delete(jobs.removeApplication);

  app.route('/companies/:companyId/jobs/:jobId/applicants')
  .get(jobs.listApplications);
};
