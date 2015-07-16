var utilities = require('../services/utilities.js'),
		companies = require('../services/company.service.js');

exports.list = function(req, res, next) {
  console.log('getting companies');
  utilities.setHeaders(res);

  res.send({
    Companies: companies.get()
  });
};

exports.update = function(req, res, next) {
  console.log('update company');
  utilities.setHeaders(res);

  var company = req.body;

  if (!company || !company.id) {
    return next('company Id must be specified to update a company.');
  } else {
    res.json(companies.set(company));
  }
};

exports.read = function(req, res, next) {
  console.log('get company');
  utilities.setHeaders(res);

  if (!req.params || !req.params.companyId) {
    return next('company Id must be specified to retrieve a company.');
  } else {
    res.json(companies.get(req.params.companyId));
  }
};

exports.remove = function(req, res, next) {
  console.log('get company');
  utilities.setHeaders(res);

  if (!req.params || !req.params.companyId) {
    return next('company Id must be specified to remove a company.');
  } else {
    res.json({ delete: companies.delete(req.params.companyId) });
  }
};

exports.createCompany = function(req, res, next) {
  console.log('create company');
  utilities.setHeaders(res);

  res.json(companies.createCompany(req.body));
};
