var utilities = require('../services/utilities.js'),
		jobs = require('../services/jobs.service.js'),
		applicants = require('../services/applicant.service.js');

exports.listAll = function(req, res, next) {
  console.log('getting job listings');
  utilities.setHeaders(res);

  res.send({
    Jobs: jobs.list()
  });
};

exports.list = function(req, res, next) {
  console.log('getting job listings for company');
  utilities.setHeaders(res);

  res.send({
    Jobs: jobs.list()
  });
};

exports.listApplications = function(req, res, next) {
  console.log('listing applicants for job listing');
  utilities.setHeaders(res);

  res.send({
    Applicants: applicants.list()
  });
};

exports.createJobListing = function(req, res, next) {
  console.log('create job listing');
  utilities.setHeaders(res);

  var company = req.body;

  if (!company || !company.id) {
    return next('company Id must be specified to update a company.');
  } else {
    res.json(applicants.createApplicant({ company: company }));
  }
};

exports.updateApplication = function(req, res, next) {
  console.log('update application');
  utilities.setHeaders(res);

  var application = req.body;

  if (!application || !application.id) {
    return next('application Id must be specified to update an application.');
  } else {
    res.json(applicants.set(application));
  }
};

exports.readApplication = function(req, res, next) {
  console.log('get application');
  utilities.setHeaders(res);

  if (!req.params || !req.params.applicationId) {
    return next('application Id must be specified to retrieve an application.');
  } else {
    res.json(applicants.get(req.params.applicationId));
  }
};

exports.removeApplication = function(req, res, next) {
  console.log('remove application');
  utilities.setHeaders(res);

  if (!req.params || !req.params.applicationId) {
    return next('company Id must be specified to remove a company.');
  } else {
    res.json({ delete: applicants.delete(req.params.applicationId) });
  }
};
